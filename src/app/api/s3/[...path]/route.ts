import { NextResponse } from "next/server";
import { shelbyClient } from "@/lib/shelby/client";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || [];
  const s3Bucket = pathSegments[0] || "default-bucket";
  const s3Key = pathSegments.slice(1).join("/") || "unnamed.dcm";

  // Parse payload stream from PACS
  const bodyBuffer = await request.arrayBuffer();
  const bytes = new Uint8Array(bodyBuffer);

  // Dispatch to Shelby Placement Group via Shelby Client
  const shelbyMetadata = await shelbyClient.uploadDicomBlob({
    blobName: `${s3Bucket}/${s3Key}`,
    accountAddress: "0x894a91f04b28d9c02e11894a76291f00ab948210bc781048bca29d10e8829910",
    encryptedData: bytes.length > 0 ? bytes : new Uint8Array(1024),
    expirationDays: 1825, // 5 years
  });

  return new NextResponse(null, {
    status: 200,
    headers: {
      "ETag": `"${shelbyMetadata.txHash}"`,
      "x-amz-request-id": "SHELBY-S3-PROXY-" + Date.now(),
      "X-Shelby-Blob-Uri": shelbyMetadata.blobUri,
      "X-Shelby-Placement-Group": shelbyMetadata.placementGroupId.toString(),
    },
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  const pathSegments = resolvedParams.path || [];
  const s3Bucket = pathSegments[0] || "default-bucket";
  const s3Key = pathSegments.slice(1).join("/") || "unnamed.dcm";

  // Stream byte range from Shelby RPC
  const streamResult = await shelbyClient.streamByteRange({
    blobUri: `0x894a...9910/${s3Bucket}/${s3Key}`,
    sessionToken: "shelby_sess_pacs_auto_session",
    startByte: 0,
    endByte: 1024 * 1024 - 1, // 1 MB
  });

  const blob = new Blob([streamResult.dataChunk.buffer as ArrayBuffer]);

  return new NextResponse(blob, {
    status: 200,
    headers: {
      "Content-Type": "application/dicom",
      "Content-Length": streamResult.dataChunk.length.toString(),
      "Accept-Ranges": "bytes",
      "X-DoubleZero-Latency-Ms": streamResult.latencyMs.toString(),
    },
  });
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Content-Type": "application/dicom",
      "Accept-Ranges": "bytes",
      "X-Shelby-Status": "WRITTEN",
    },
  });
}
