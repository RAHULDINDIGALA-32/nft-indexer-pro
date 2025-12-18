import { VStack, Input, Button } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletSection({
  address,
  setAddress,
  onFetch,
}) {
  return (
    <VStack spacing={4} mb={10}>
      <ConnectButton />
      {!address && (
        <Input
          placeholder="Enter wallet address or ENS"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          bg="white"
          color="black"
          w="360px"
          textAlign="center"
        />
      )}
      <Button onClick={onFetch} colorScheme="blue">
        Fetch NFTs
      </Button>
    </VStack>
  );
}
