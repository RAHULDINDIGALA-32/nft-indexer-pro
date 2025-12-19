import { VStack, Input, Button, Box, HStack, Text } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import ChainSelector from './chainSelector';

export default function WalletSection({
  address,
  setAddress,
  setChainId,
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
      py={20}
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
                w={'70%'}
                h={30}
                textAlign={'center'}
              />

            <HStack width="100%" justifyContent="center" spacing={35}>
              <div>
                  <ChainSelector 
                onChange={setChainId} />
              </div>
              
                
              <Button
                onClick={onFetch}
                background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                border="none"
                color="white"
                fontWeight="600"
                px={10}
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
                mt={20}
               
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
            px={10}
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
            mt={18}
          >
            Fetch My NFTs
          </Button>
        )}
      </VStack>
    </Box>
  );
}
