import AppShell from './components/AppShell';
import Header from './components/Header';
import WalletSection from './components/Wallet';
import NFTGrid from './components/NFTGrid';
import { useNFTs } from './hooks/useNFT';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { Center, Spinner, Alert } from '@chakra-ui/react';

export default function App() {
  const { address, isConnected } = useAccount();
  const [manualAddress, setManualAddress] = useState('');
  const { nfts, loading, error, fetchNFTs } = useNFTs();

  const owner = isConnected ? address : manualAddress;

  useEffect(() => {
    if (isConnected && address) fetchNFTs(address);
  }, [isConnected]);

  return (
    <AppShell>
      <Header />

      <WalletSection
        address={manualAddress}
        setAddress={setManualAddress}
        onFetch={() => owner && fetchNFTs(owner)}
      />

      {loading && (
        <Center><Spinner size="xl" /></Center>
      )}

      {error && (
        <Alert status="error">{error}</Alert>
      )}

      {!loading && <NFTGrid nfts={nfts} />}
    </AppShell>
  );
}
