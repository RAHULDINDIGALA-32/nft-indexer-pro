import {
  Box,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { resolveNFTImage } from '../utils/image';

export default function NFTCard({ nft }) {
  return (
    <Box
      className="card-glass"
      borderRadius="xl"
      overflow="hidden"
      transition="all .2s"
      _hover={{ transform: 'translateY(-6px)', boxShadow: 'xl' }}
    >
      <Skeleton isLoaded>
        <Image
          src={resolveNFTImage(nft)}
          alt={nft.title}
          aspectRatio={1}
          objectFit="cover"
        />
      </Skeleton>

      <Box p={4}>
        <Text fontWeight="bold" isTruncated>
          {nft.title || 'Unnamed NFT'}
        </Text>
        <Text fontSize="sm" opacity={0.6}>
          #{nft.tokenId}
        </Text>
      </Box>
    </Box>
  );
}
