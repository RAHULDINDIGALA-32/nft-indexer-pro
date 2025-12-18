import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AspectRatio,
  Badge,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const alchemy = new Alchemy({
  apiKey: "Z9YPZSpaYutwn9JJeJBjB",
  network: Network.ETH_SEPOLIA,
});

function normalizeImageUrl(url) {
  if (!url) return 'https://via.placeholder.com/200';
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
}

function App() {
  const { address, isConnected } = useAccount();

  const [inputAddress, setInputAddress] = useState('');
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasQueried, setHasQueried] = useState(false);

  const ownerAddress = isConnected ? address : inputAddress;

  async function fetchNFTs() {
    if (!ownerAddress) {
      setError('Please connect a wallet or enter an address.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setHasQueried(false);

      const response = await alchemy.nft.getNftsForOwner(ownerAddress);
      setNfts(response.ownedNfts);
      setHasQueried(true);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch NFTs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-fetch NFTs when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs();
    }
  }, [isConnected, address]);

  const cardBg = useColorModeValue('rgba(255,255,255,0.02)', 'rgba(255,255,255,0.03)');

  return (
    <Box className="app-shell" w="100%">
      <Flex
        align="center"
        justify="space-between"
        mb={8}
        px={[2, 4, 0]}
      >
        <Box>
          <Heading size="lg">NFT Indexer</Heading>
          <Text fontSize="sm" color="gray.300">Scan and view ERC-721 assets</Text>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      {!isConnected && (
        <Center mb={6}>
          <Input
            placeholder="Enter wallet address or ENS"
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            maxW="640px"
            textAlign="center"
            bg={useColorModeValue('white','gray.700')}
            color={useColorModeValue('black','white')}
            py={6}
            px={4}
            borderRadius="md"
            boxShadow="sm"
          />
        </Center>
      )}

      <Center mb={6}>
        <Button onClick={fetchNFTs} isDisabled={isLoading} size="lg">
          {isLoading ? <Spinner /> : 'Fetch NFTs'}
        </Button>
      </Center>

      {error && (
        <Center mt={4}>
          <Alert status="error" w="full" maxW="640px">
            <AlertIcon />
            {error}
          </Alert>
        </Center>
      )}

      {hasQueried && (
        <Box px={[2, 4, 0]}>
          <Heading my={6} textAlign="left">Your NFTs</Heading>

          {isLoading ? (
            <Stack>
              <Skeleton height="200px" />
            </Stack>
          ) : nfts.length === 0 ? (
            <Center>
              <Text>No NFTs found for this address.</Text>
            </Center>
          ) : (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
              {nfts.map((nft, index) => (
                <Box
                  key={`${nft.contract.address}-${nft.tokenId}-${index}`}
                  borderRadius="12px"
                  overflow="hidden"
                  className="card-glass"
                  bg={cardBg}
                  transition="transform 0.18s ease, box-shadow 0.18s ease"
                  _hover={{ transform: 'translateY(-6px)', boxShadow: 'lg' }}
                >
                  <AspectRatio ratio={1}>
                    <Image
                      src={normalizeImageUrl(nft.rawMetadata?.image)}
                      alt={nft.title || 'NFT Image'}
                      objectFit="cover"
                      className="nft-image"
                    />
                  </AspectRatio>

                  <Box p={4}>
                    <Text fontWeight="600" mb={2} isTruncated>
                      {nft.title || nft.rawMetadata?.name || 'Unnamed NFT'}
                    </Text>
                    <Flex align="center" justify="space-between">
                      <Badge variant="subtle" colorScheme="purple">
                        {nft.contract && nft.contract.symbol ? nft.contract.symbol : 'ERC-721'}
                      </Badge>
                      <Text fontSize="xs" color="gray.300">#{nft.tokenId}</Text>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;
