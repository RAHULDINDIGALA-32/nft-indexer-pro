import { Heading, Text, VStack, Box } from '@chakra-ui/react';

export default function Header() {
  return (
    <VStack spacing={4} mb={12} className="fade-in">
      <Box position="relative" textAlign="center">
        <Heading 
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight="900"
          letterSpacing="-0.03em"
          mb={2}
          className="gradient-text"
        >
          NFT Indexer
        </Heading>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="200px"
          height="200px"
          background="radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)"
          borderRadius="50%"
          filter="blur(60px)"
          zIndex="-1"
        />
      </Box>
      <Text 
        fontSize={{ base: 'md', md: 'lg' }}
        opacity={0.8}
        fontWeight="400"
        textAlign="center"
        maxW="600px"
        lineHeight="1.6"
      >
        Discover and explore all ERC-721 NFTs owned by any wallet address
      </Text>
    </VStack>
  );
}
