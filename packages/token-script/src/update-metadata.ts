import { config } from "dotenv";
config(); // load environment variables from .env

import {
  createUpdateMetadataAccountV2Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import * as fs from "fs";

// Ensure environment variables are set
if (!process.env.MINT_ADDRESS) {
  throw new Error("MINT_ADDRESS is not defined in the .env file");
}
if (!process.env.URI) {
  throw new Error("URI is not defined in the .env file");
}
if (!process.env.WALLET_PATH) {
  throw new Error("WALLET_PATH is not defined in the .env file");
}

const MINT_ADDRESS = new PublicKey(process.env.MINT_ADDRESS);
const URI = process.env.URI;

// Load wallet keypair from file; ensure the file contains a base58-encoded private key

const walletKeyData = JSON.parse(
  fs.readFileSync(process.env.WALLET_PATH, "utf-8"),
);
const WALLET_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(walletKeyData));

async function main() {
  // Connect to Solana Devnet
  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed",
  );

  // Define the metadata for your token
  const metadataData: DataV2 = {
    name: "Giricoin",
    symbol: "GIRI",
    uri: URI,
    sellerFeeBasisPoints: 0,
    // Use undefined if no creators, collection, or uses are provided
    creators: null,
    collection: null,
    uses: null,
  };

  // Metaplex Token Metadata Program ID (keep this as is)
  const metadataProgramId = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
  );

  // Derive the PDA (Program Derived Address) for the metadata account
  const [metadataPDA] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      metadataProgramId.toBuffer(),
      MINT_ADDRESS.toBuffer(),
    ],
    metadataProgramId,
  );

  // Create the instruction to create metadata account
  const instruction = createUpdateMetadataAccountV2Instruction(
    {
      metadata: metadataPDA,
      updateAuthority: WALLET_KEYPAIR.publicKey,
    },
    {
      updateMetadataAccountArgsV2: {
        data: metadataData,
        updateAuthority: WALLET_KEYPAIR.publicKey,
        primarySaleHappened: null,
        isMutable: true,
      },
    },
  );

  // Build and send the transaction
  const tx = new Transaction().add(instruction);
  const txid = await sendAndConfirmTransaction(connection, tx, [
    WALLET_KEYPAIR,
  ]);
  console.log("✅ Metadata Updated successfully. Transaction ID:", txid);
}

main().catch(console.error);
