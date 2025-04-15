# 🪙 Giricoin: Custom Solana Token + Metadata + Backpack Integration

![Solana](https://img.shields.io/badge/Solana-Token-blueviolet?logo=solana)
![TypeScript](https://img.shields.io/badge/TypeScript-Code-blue?logo=typescript)
![Status](https://img.shields.io/badge/Live-Devnet-brightgreen?logo=solana)

---

## ✨ What is this?

**Giricoin** is a custom Solana token created using Web3, Metaplex Token Metadata, and CLI wallet tooling. The project allows you to:

- Mint your own SPL token on Solana 🚀
- Attach Metadata (name, symbol, URI) 🎨
- View it live in **Backpack Wallet** 🦊
- Easily update token metadata 💫

---

## 🛠️ Tech Stack

| Tool / Library                      | Purpose                              |
|-----------------------------------|--------------------------------------|
| `@solana/web3.js`                 | Interact with Solana blockchain      |
| `@metaplex-foundation/mpl-token-metadata` | Manage token metadata            |
| `ts-node` + `dotenv`              | Script running + secrets management  |
| `bs58`, `fs`                      | Handle wallet files                  |

---

## 🚧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/parthkapoor-dev/giricoin.git
cd giricoin/packages/token-script
```

### 2. Install dependencies
```bash
yarn install
# or
npm install
```

### 3. Set up `.env`
Create a `.env` file with:
```dotenv
WALLET_PATH=/path/to/your/cli-wallet.json
MINT_ADDRESS=YourMintAddressHere
URI=https://your-hosted-token-json.com/metadata.json
```

---

## 🪄 Create Metadata (First Time Only)

```bash
npm run create-metadata.ts
```

> ⚠️ Only run this once per token. To update, use the update script below.

---

## 🔁 Update Metadata (Name, Symbol, URI)

To update existing token metadata:

```bash
npm run update-metadata.json
```

The script uses the same `.env` variables but modifies the metadata instead of creating a new one.

---

## 👀 View in Backpack Wallet

Once metadata is set, your token should:

✅ Appear in Backpack Wallet
✅ Show correct name, symbol & image
✅ Be visible on [solscan.io](https://solscan.io/) or [solana.fm](https://solana.fm/)

> If it's not visible instantly, refresh or clear cache in Backpack.

---

## 📦 Folder Structure
```
packages/
├── token-script/
│   ├── src/
│   │   ├── create-metadata.ts
│   │   ├── update-metadata.ts
│   └── .env
```

---

## 💡 Inspiration

Built with ❤️ for the Solana ecosystem, and a small step toward enabling founder-friendly Web3 tooling.

> "Not your coin, not your identity. Create your own."

---

## 📸 Preview

![Backpack Demo](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmw4aWVnNTYzbXJvNm16bDlsOTJrand4aHdnZHdqbzBmbzM4ZnRwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QDK1pCI43lGhO/giphy.gif)

---

## 🧪 Future Ideas

- ✅ Deploy on **mainnet**
- ✅ Add **creator royalties**
- ✅ Allow **collection** metadata
- ✅ Integrate with **Candy Machine**
- 🔜 UI Dashboard to mint & update easily

---

## 📬 Feedback

Feel free to open an issue or ping [@parthkapoor_te](https://twitter.com/parthkapoor_te) with suggestions!

---

## 🔐 License

MIT License. Free to use, fork, and build on.

---
