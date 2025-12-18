import { Heading, Text, VStack } from '@chakra-ui/react';

export default function Header() {
  return (
    <VStack spacing={2} mb={10}>
      <Heading fontSize="4xl">NFT Indexer</Heading>
      <Text opacity={0.7}>
        Discover all ERC-721 NFTs owned by any wallet
      </Text>
    </VStack>
  );
}
