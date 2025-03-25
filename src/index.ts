import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { HDKey } from "micro-ed25519-hdkey";
import bs58 from "bs58";

// Gerar uma seed phrase aleatória (12 palavras) usando o padrão BIP-39
const mnemonic = bip39.generateMnemonic(128); // 128 bits geram 12 palavras
console.log("Seed Phrase Gerada:", mnemonic);

// Gerar a semente a partir da frase mnemônica
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const hd = HDKey.fromMasterSeed(seed.toString("hex"));

// Gerar as chaves a partir do caminho HD
for (let i = 0; i < 10; i++) {
  const path = `m/44'/501'/${i}'/0'`;

  // Derivar a chave privada a partir do caminho HD
  const keypair = Keypair.fromSeed(hd.derive(path).privateKey);

  // Exibir o endereço público em Base58
  console.log(`${path} => Endereço Público (Base58): ${keypair.publicKey.toBase58()}`);

  // Codificar a chave privada em Base58
  const privateKeyBase58 = bs58.encode(keypair.secretKey);

  // Exibir a chave privada em Base58
  console.log(`${path} => Chave Privada (Base58): ${privateKeyBase58}`);
}
