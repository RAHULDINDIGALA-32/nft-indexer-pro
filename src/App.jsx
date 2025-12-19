import AppShell from './components/AppShell';
import Header from './components/Header';
import WalletSection from './components/Wallet';
import NFTGrid from './components/NFTGrid';
import NFTModal from './components/NFTModal';
import Footer from './components/Footer';
import { useNFTs } from './hooks/useNFT';
import { useResolveENS } from './hooks/useResolveENS';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { Center, Spinner, Alert, VStack, Text } from '@chakra-ui/react';

export default function App() {
  const { address, isConnected, chainId  } = useAccount();
  const [manualAddress, setManualAddress] = useState('');
  const [selectedNFT, setSelectedNFT] = useState(null);
  const { nfts, loading, error, fetchNFTs } = useNFTs();
  const { address: ensAddress, loading: ensLoading, error: ensError, resolveENS } = useResolveENS();
  const [selectedchainId, setSelectedChainId] = useState(1);

  const networkChainId = isConnected ? chainId : selectedchainId;

  useEffect(() => {
    if (isConnected && address) fetchNFTs(address, networkChainId);
  }, [isConnected]);

   const handleFetchNFTs = async () => {
     let ownerAddress;

     if(isConnected && address) {
      ownerAddress = address;
     } else {
      resolveENS(manualAddress);
      ownerAddress = ensAddress;
     }

     if(!ownerAddress) return;

     fetchNFTs(ownerAddress, networkChainId);
   }
  const handleSelectNFT = (nft) => {
    setSelectedNFT(nft);
  };

  const handleCloseModal = () => {
    setSelectedNFT(null);
  };

  return (
    <AppShell>
      <Header />

      <WalletSection
        address={manualAddress}
        setAddress={setManualAddress}
        setChainId={setSelectedChainId}
        onFetch={handleFetchNFTs}
      />

      {(loading || ensLoading) && (
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner 
              size="xl" 
              thickness="4px"
              speed="0.8s"
              color="purple.400"
              sx={{
                '& .chakra-spinner__track': {
                  borderColor: 'rgba(102, 126, 234, 0.2)',
                },
                '& .chakra-spinner__indicator': {
                  borderColor: 'transparent',
                  borderTopColor: 'purple.400',
                  borderRightColor: 'pink.400',
                },
              }}
            />
            <Text opacity={0.7} fontWeight="500">
              Loading NFTs...
            </Text>
          </VStack>
        </Center>
      )}

      {(error || ensError) && (
        <Alert 
          status="error"
          borderRadius="12px"
          background="rgba(239, 68, 68, 0.1)"
          border="1px solid rgba(239, 68, 68, 0.3)"
          color="red.300"
        >
          {ensError ? ensError : error}
        </Alert>
      )}

      {!loading && <NFTGrid nfts={nfts} onSelect={handleSelectNFT} />}

      <NFTModal 
        nft={selectedNFT} 
        isOpen={!!selectedNFT} 
        onClose={handleCloseModal} 
      />

      <Footer />
    </AppShell>
  );
}
