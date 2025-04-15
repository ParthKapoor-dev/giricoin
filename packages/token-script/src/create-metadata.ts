import dotenv from "dotenv";
dotenv.config();

import {
  createCreateMetadataAccountV3Instruction,
  DataV2,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as bs58 from "bs58";
import * as fs from "fs";

// Replace with your mint and wallet path
const MINT_ADDRESS = new PublicKey(process.env.MINT_ADDRESS);
const WALLET_KEYPAIR = Keypair.fromSecretKey(
  bs58.decode(fs.readFileSync("~/.config/solana/id.json", "utf-8"))
);
const uri = process.env.URI;

async function main() {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const metadataData: DataV2 = {
    name: "Giricoin",
    symbol: "GIRI",
    uri,
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const metadataPDA = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
      MINT_ADDRESS.toBuffer(),
    ],
    new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")
  )[0];

  const instruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: MINT_ADDRESS,
      mintAuthority: WALLET_KEYPAIR.publicKey,
      payer: WALLET_KEYPAIR.publicKey,
      updateAuthority: WALLET_KEYPAIR.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        data: metadataData,
        isMutable: true,
        collectionDetails: null,
      },
    }
  );

  const tx = new Transaction().add(instruction);
  const txid = await sendAndConfirmTransaction(connection, tx, [WALLET_KEYPAIR]);
  console.log("✅ Metadata created:", txid);
}

main().catch(console.error);
