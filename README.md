# 🖼️ NFT Indexer Pro — Web3 NFT Explorer dApp

A modern, **production-grade NFT Indexer dApp** that allows users to instantly fetch and explore all **ERC-721 NFTs** owned by any wallet address or **ENS name**, across multiple Ethereum-compatible networks.

Built with **React**, **Vite**, **Chakra UI**, **wagmi**, **RainbowKit**, and the **Alchemy SDK**, and deployed on **Vercel**.

---

## 🌐 Live Demo

**Frontend (Vercel):** https://nft-indexer-pro.vercel.app/

---

## ✨ Features

### 🧠 ENS Support
- Enter an **ENS name** (e.g. `vitalik.eth`) or a raw wallet address  
- ENS names are automatically resolved to wallet addresses

### ⛓️ Chain-Aware NFT Indexing
- Dynamically indexes NFTs based on the **connected wallet’s active network**
- Supports Ethereum, Sepolia, Polygon, Base, Arbitrum, and other EVM chains

### 🖼️ Blazing-Fast NFT Fetching
- Uses **Alchemy Enhanced NFT APIs**
- Fetches NFT collections in seconds — **no manual indexing required**

### 🔐 Wallet-Native UX
- Seamless wallet connection via **RainbowKit**
- Supports MetaMask, WalletConnect, Coinbase Wallet, and more

### 🎴 Interactive NFT Cards & Modal
- Cyberpunk / Web3-grade UI
- NFT image and metadata preview
- Attribute viewer with smooth animations
- IPFS → HTTPS image resolution with fallbacks

### 🧩 Reusable Component Architecture
- Clean separation of concerns
- Reusable UI components and hooks for scalability

### 🚀 Production-Grade UX
- Loading states, empty states, and error handling
- Responsive grid layout
- Consistent Web3 theming

---

## 🛠️ Tech Stack

### Frontend
- React + Vite  
- JavaScript / TypeScript  
- Chakra UI  
- wagmi  
- RainbowKit  
- @tanstack/react-query  

### Web3 & Indexing
- Alchemy SDK  
- Alchemy Enhanced NFT APIs  
- ENS Resolution  
- Multi-Chain Support  

### Infrastructure
- Vercel (Frontend Deployment)

---

## 🔍 How NFT Indexing Works

Thanks to **Alchemy’s Enhanced APIs**, this app can instantly fetch NFTs owned by an address without running a custom indexer.

Under the hood, the app:

1. Resolves **ENS → wallet address** (if needed)
2. Detects the **active chain** from the connected wallet
3. Calls `getNftsForOwner`
4. Fetches enriched metadata via `getNftMetadata`
5. Normalizes IPFS images and renders them safely in the UI

### 🚫 What This Avoids
- Traversing every block
- Parsing every transaction
- Manually indexing ERC-721 transfer events
- Maintaining a custom NFT database

---

## 🚀 Getting Started Locally

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RAHULDINDIGALA-32/nft-indexer-pro.git
cd nft-indexer-pro
```

### 2️⃣ Install Dependencies
```
npm install
```

### 3️⃣ Configure Environment Variables

Create a .env file in the project root:
```
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
```
⚠️ In Vite apps, environment variables must be prefixed with VITE_


### 4️⃣ Run the Development Server
```
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 🧠 Supported Inputs

✅ Wallet Address `0xabc123...`

✅ ENS Name `vitalik.eth`

✅ Wallet-Connected Mode
Automatically indexes NFTs for the connected wallet

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Built with ❤️ by Rahul Dindigala

GitHub: https://github.com/RAHULDINDIGALA-32

---

## 🧠 Future Improvements

- ENS avatar & profile resolution
- NFT pagination & infinite scrolling
- NFT detail deep-links (OpenSea / Etherscan)
- Cached indexing via React Query
- Multi-chain selector UI
- NFT filtering by contract / traits
- Subgraph-based indexing alternative


