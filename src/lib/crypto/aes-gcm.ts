/**
 * Web Crypto API AES-256-GCM Encryption / Decryption Utilities
 * Provides zero-knowledge data security before uploading to Shelby Protocol
 */

export interface EncryptedPayload {
  cipherBytes: Uint8Array;
  ivHex: string;
  keyBase64: string;
}

export async function generateAesKey(): Promise<CryptoKey> {
  return await crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function exportKeyToBase64(key: CryptoKey): Promise<string> {
  const rawKey = await crypto.subtle.exportKey("raw", key);
  const bytes = new Uint8Array(rawKey);
  return btoa(String.fromCharCode(...bytes));
}

export async function importKeyFromBase64(base64Key: string): Promise<CryptoKey> {
  const binaryString = atob(base64Key);
  const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "raw",
    bytes.buffer,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptBufferAES256(
  dataBuffer: Uint8Array,
  secretKey?: CryptoKey
): Promise<EncryptedPayload> {
  const key = secretKey || (await generateAesKey());
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cipherBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    dataBuffer.buffer as ArrayBuffer
  );

  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const keyBase64 = await exportKeyToBase64(key);

  return {
    cipherBytes: new Uint8Array(cipherBuffer),
    ivHex,
    keyBase64,
  };
}

export async function decryptBufferAES256(
  cipherBytes: Uint8Array,
  ivHex: string,
  keyBase64: string
): Promise<Uint8Array> {
  const key = await importKeyFromBase64(keyBase64);
  const ivMatches = ivHex.match(/.{1,2}/g);
  const iv = new Uint8Array(ivMatches ? ivMatches.map((byte) => parseInt(byte, 16)) : []);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    cipherBytes.buffer as ArrayBuffer
  );

  return new Uint8Array(decryptedBuffer);
}
