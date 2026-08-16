/**
 * Cross-Chain Medical Identity Bridge (SIWE/SIWS)
 * Implementation of Aptos Derivable Account Abstraction (AIP-113)
 * Maps EVM & Solana wallet public keys to Aptos account addresses without gas token requirements
 */

export interface DerivedIdentity {
  sourceChain: 'EVM' | 'SOLANA' | 'APTOS';
  originalAddress: string;
  aptosDerivedAddress: string;
  derivedNamespace: string;
  verificationHash: string;
  authenticatedAt: string;
  isGaslessEnabled: boolean;
}

export async function deriveAptosAccountFromEVM(evmAddress: string): Promise<DerivedIdentity> {
  const cleanAddress = evmAddress.toLowerCase().replace("0x", "");
  const encoder = new TextEncoder();
  const data = encoder.encode(`AIP-113-DERIVABLE-ACCOUNT:EVM:${cleanAddress}`);
  
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
  const aptosDerivedAddress = "0x" + hexHash.substring(0, 64);
  
  return {
    sourceChain: "EVM",
    originalAddress: evmAddress,
    aptosDerivedAddress,
    derivedNamespace: `${aptosDerivedAddress}/nuvamed/studies`,
    verificationHash: "0x" + hexHash.substring(0, 16),
    authenticatedAt: new Date().toISOString(),
    isGaslessEnabled: true,
  };
}

export async function deriveAptosAccountFromSolana(solanaPublicKey: string): Promise<DerivedIdentity> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`AIP-113-DERIVABLE-ACCOUNT:SOLANA:${solanaPublicKey}`);
  
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
  const aptosDerivedAddress = "0x" + hexHash.substring(0, 64);
  
  return {
    sourceChain: "SOLANA",
    originalAddress: solanaPublicKey,
    aptosDerivedAddress,
    derivedNamespace: `${aptosDerivedAddress}/nuvamed/studies`,
    verificationHash: "0x" + hexHash.substring(0, 16),
    authenticatedAt: new Date().toISOString(),
    isGaslessEnabled: true,
  };
}

export function createSIWEAuthChallenge(address: string, chain: string): string {
  const domain = "nuvamed.health";
  const nonce = Math.random().toString(36).substring(2, 10);
  const issueTime = new Date().toISOString();
  
  return (
    `${domain} wants you to sign in with your ${chain} account:\n` +
    `${address}\n\n` +
    `Authorize NuvaMed Health Data Exchange & DICOM Network.\n` +
    `AIP-113 Derivable Account Mapping Activation.\n\n` +
    `URI: https://${domain}\n` +
    `Version: 1\n` +
    `Chain ID: 1\n` +
    `Nonce: ${nonce}\n` +
    `Issued At: ${issueTime}`
  );
}
