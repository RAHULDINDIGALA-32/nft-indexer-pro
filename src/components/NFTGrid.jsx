import { SimpleGrid, Text } from '@chakra-ui/react';
import NFTCard from './NFTCard';

export default function NFTGrid({ nfts }) {
  if (!nfts.length) {
    return <Text>No NFTs found.</Text>;
  }

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {nfts.map((nft) => (
        <NFTCard
          key={`${nft.contract.address}-${nft.tokenId}`}
          nft={nft}
        />
      ))}
    </SimpleGrid>
  );
}
