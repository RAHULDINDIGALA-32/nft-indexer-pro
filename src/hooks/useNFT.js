import { useState } from 'react';
import { Alchemy } from 'alchemy-sdk';
import { ALCHEMY_NETWORKS } from '../utils/alchemyNetworks';
import { isAddress } from 'viem';



export function useNFTs() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchNFTs(owner, chainId) {
    const network = ALCHEMY_NETWORKS[chainId];    

    if (!network) {
      setError('Unsupported network');
      return;
    }

    if(!isAddress(owner)) {
      setError('Invalid address');
      return;
    }

    const alchemy = new Alchemy({
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: network,
    });
    
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
