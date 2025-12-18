import { VStack, Input, Button, Box, HStack, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function WalletSection({
  address,
  setAddress,
  onFetch,
}) {
  const { isConnected } = useAccount();

  return (
    <Box
      mb={12}
      className="fade-in"
      background="rgba(255, 255, 255, 0.02)"
      backdropFilter="blur(20px)"
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="20px"
      p={6}
    >
      <VStack spacing={5}>
        {/* Connect Button */}
        <Box width="100%" display="flex" justifyContent="center">
          <ConnectButton />
        </Box>

        {/* Manual Address Input */}
        {!isConnected && (
          <VStack spacing={3} width="100%" maxW="500px">
            <Text
              fontSize="sm"
              fontWeight="500"
              opacity={0.7}
              textAlign="center"
            >
              Or enter a wallet address manually
            </Text>
            <HStack spacing={3} width="100%">
              <Input
                placeholder="0x... or ENS name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                background="rgba(255, 255, 255, 0.05)"
                border="1px solid rgba(255, 255, 255, 0.1)"
                borderRadius="12px"
                color="white"
                _placeholder={{ color: 'rgba(255, 255, 255, 0.4)' }}
                _focus={{
                  borderColor: 'rgba(102, 126, 234, 0.5)',
                  boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
                _hover={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                fontFamily="monospace"
                fontSize="sm"
              />
              <Button
                onClick={onFetch}
                background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                border="none"
                color="white"
                fontWeight="600"
                px={8}
                _hover={{
                  background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                isDisabled={!address}
                opacity={!address ? 0.5 : 1}
              >
                Fetch NFTs
              </Button>
            </HStack>
          </VStack>
        )}

        {/* Fetch Button for Connected Wallet */}
        {isConnected && (
          <Button
            onClick={onFetch}
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            border="none"
            color="white"
            fontWeight="600"
            px={8}
            width="100%"
            maxW="300px"
            _hover={{
              background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
          >
            Fetch My NFTs
          </Button>
        )}
      </VStack>
    </Box>
  );
}
