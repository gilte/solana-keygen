import { Keypair } from "@solana/web3.js";
import { HDKey } from "micro-ed25519-hdkey";
import * as bip39 from "bip39";
import bs58 from "bs58";

const mnemonic =
  "neither lonely flavor argue grass remind eye tag avocado spot unusual intact";

// Gerar a semente a partir da frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const hd = HDKey.fromMasterSeed(seed.toString("hex"));

for (let i = 0; i < 10; i++) {
  const path = `m/44'/501'/${i}'/0'`;
  
  // Derivar a chave privada a partir do caminho HD
  const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
  
  // Exibir o endereço público em Base58
  console.log(`${path} => Endereço Público (Base58): ${keypair.publicKey.toBase58()}`);
  
  // Codificar a chave privada em Base58
  const privateKeyBase58 = bs58.encode(keypair.secretKey);
  
  // Exibir a chave privada em Base58
  console.log(`Chave Privada (Base58): ${privateKeyBase58}`);
}
