import { NextRequest, NextResponse } from "next/server";
import { shelbyClient } from "@/lib/shelby/client";

export const dynamic = "force-dynamic";

// Helper to sanitize path params against directory traversal
function sanitizePathSegments(segments: string[]): string {
  const sanitized = segments
    .map((seg) => seg.replace(/[^a-zA-Z0-9_\-\.]/g, ""))
    .filter((seg) => seg !== ".." && seg !== "." && seg.length > 0);
  return sanitized.join("/");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const requestId = request.headers.get("x-request-id") || crypto.randomUUID();
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path || [];
    const sanitizedPath = sanitizePathSegments(pathSegments);

    if (!sanitizedPath) {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid or missing S3 path parameters.", requestId },
        { status: 400 }
      );
    }

    const rangeHeader = request.headers.get("Range");

    // Parse byte range if present
    let startByte = 0;
    let endByte = 1024 * 1024 - 1; // Default 1MB chunk

    if (rangeHeader && rangeHeader.startsWith("bytes=")) {
      const parts = rangeHeader.replace("bytes=", "").split("-");
      startByte = parseInt(parts[0], 10) || 0;
      if (parts[1]) {
        endByte = parseInt(parts[1], 10);
      }
    }

    // Stream byte-range from Shelby placement group via DoubleZero fiber
    const streamResult = await shelbyClient.streamByteRange({
      blobUri: `0x1234/${sanitizedPath}`,
      sessionToken: "shelby_sess_pacs_gateway",
      startByte,
      endByte,
    });

    const headers = new Headers();
    headers.set("Content-Type", "application/dicom");
    headers.set("Cache-Control", "no-store, private");
    headers.set("X-Shelby-Blob-Path", sanitizedPath);
    headers.set("X-Shelby-Latency-MS", streamResult.latencyMs.toString());
    headers.set("x-request-id", requestId);
    headers.set("Content-Length", streamResult.dataChunk.byteLength.toString());

    if (rangeHeader) {
      headers.set("Content-Range", `bytes ${startByte}-${endByte}/*`);
      return new NextResponse(streamResult.dataChunk.buffer as ArrayBuffer, { status: 206, headers });
    }

    return new NextResponse(streamResult.dataChunk.buffer as ArrayBuffer, { status: 200, headers });
  } catch (err: any) {
    console.error(`[S3 Gateway Error] Request ID: ${requestId} | Error:`, err?.message);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to read byte stream from Shelby placement group.",
        requestId,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const requestId = request.headers.get("x-request-id") || crypto.randomUUID();
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams.path || [];
    const sanitizedPath = sanitizePathSegments(pathSegments);

    if (!sanitizedPath) {
      return NextResponse.json(
        { error: "Bad Request", message: "Invalid S3 target path.", requestId },
        { status: 400 }
      );
    }

    const arrayBuffer = await request.arrayBuffer();
    const dataBuffer = new Uint8Array(arrayBuffer);

    if (dataBuffer.byteLength === 0) {
      return NextResponse.json(
        { error: "Bad Request", message: "Payload size cannot be 0 bytes.", requestId },
        { status: 400 }
      );
    }

    // Upload payload to Shelby Placement Group (10+6 Clay Erasure Coding)
    const uploadResult = await shelbyClient.uploadDicomBlob({
      blobName: sanitizedPath,
      accountAddress: "0x1234567890abcdef1234567890abcdef12345678",
      encryptedData: dataBuffer,
      expirationDays: 1825,
    });

    return NextResponse.json(
      {
        success: true,
        message: "DICOM study written to Shelby placement group",
        blobUri: uploadResult.blobUri,
        placementGroupId: uploadResult.placementGroupId,
        storageProviders: uploadResult.storageProviderCount,
        path: sanitizedPath,
        txHash: uploadResult.txHash,
        requestId,
      },
      {
        status: 201,
        headers: {
          ETag: `"${uploadResult.txHash.slice(0, 16)}"`,
          "x-request-id": requestId,
        },
      }
    );
  } catch (err: any) {
    console.error(`[S3 Gateway PUT Error] Request ID: ${requestId} | Error:`, err?.message);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "Failed to dispatch DICOM payload to Shelby placement group.",
        requestId,
      },
      { status: 500 }
    );
  }
}
