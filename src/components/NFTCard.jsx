import { Box, Image, Text } from '@chakra-ui/react';
import { resolveNFTImage } from '../utils/image';

export default function NFTCard({ nft, onSelect }) {
  const imageUrl = resolveNFTImage(nft);
  const title = nft.title || nft.name || 'Unnamed NFT';
  const description = nft.description || nft.rawMetadata?.description || '';

  return (
    <Box
      className="nft-card-clickable"
      cursor="pointer"
      borderRadius="2xl"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.1)"
      transition="all 0.3s ease"
      onClick={() => onSelect && onSelect(nft)}
      _hover={{
        transform: 'scale(1.05)',
        borderColor: 'rgba(102, 126, 234, 0.5)',
      }}
    >
      <Image
        src={imageUrl}
        alt={title}
        width="100%"
        height="256px"
        objectFit="cover"
        fallback={
          <Box
            width="100%"
            height="256px"
            background="linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(246, 135, 179, 0.2) 100%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="rgba(255, 255, 255, 0.5)"
          >
            No Image
          </Box>
        }
      />

      <Box p={4} background="rgba(0, 0, 0, 0.7)" height="100%">
        <Text fontWeight="bold" fontSize="lg" color="white" mb={2} noOfLines={1}>
          {title}
        </Text>
        {description && (
          <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)" noOfLines={2}>
            {description}
          </Text>
        )}
      </Box>
    </Box>
  );
}
