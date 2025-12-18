import { useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';

const alchemy = new Alchemy({
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
});

export function useNFTs() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchNFTs(owner) {
    try {
      setLoading(true);
      setError(null);

      const res = await alchemy.nft.getNftsForOwner(owner);
      setNfts(res.ownedNfts);
    } catch (e) {
      setError('Failed to fetch NFTs');
    } finally {
      setLoading(false);
    }
  }

  return { nfts, loading, error, fetchNFTs };
}
