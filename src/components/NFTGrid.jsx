import { SimpleGrid, Text, Box, VStack } from '@chakra-ui/react';
import NFTCard from './NFTCard';

export default function NFTGrid({ nfts, onSelect }) {
  if (!nfts.length) {
    return (
      <VStack spacing={4} py={12}>
        <Box
          width="80px"
          height="80px"
          borderRadius="50%"
          background="linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(246, 135, 179, 0.2) 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="3xl"
        >
          🖼️
        </Box>
        <Text 
          fontSize="xl" 
          fontWeight="600"
          opacity={0.7}
          textAlign="center"
        >
          No NFTs found
        </Text>
        <Text 
          fontSize="sm" 
          opacity={0.5}
          textAlign="center"
          maxW="400px"
        >
          Connect your wallet or enter a wallet address to discover NFTs
        </Text>
      </VStack>
    );
  }

  return (
    <Box>
      {/* Grid Header */}
      <Box mb={6} className="fade-in">
        <Text
          fontSize="sm"
          fontWeight="600"
          opacity={0.8}
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          {nfts.length} {nfts.length === 1 ? 'NFT' : 'NFTs'} Found
        </Text>
      </Box>

      {/* NFT Grid */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 4, md: 6 }}
        minChildWidth="280px"
      >
        {nfts.map((nft, index) => (
          <Box
            key={`${nft.contract?.address}-${nft.tokenId}-${index}`}
            className="fade-in"
            style={{
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
            }}
          >
            <NFTCard nft={nft} onSelect={onSelect} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
