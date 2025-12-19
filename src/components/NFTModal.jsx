import { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { resolveNFTImage } from '../utils/image';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

export default function NFTModal({
  nft,
  isOpen,
  onClose,
}) {
  const theme = extendTheme({});
  const [showAttributes, setShowAttributes] = useState(false);

  if (!nft) return null;

  const imageUrl = resolveNFTImage(nft);
  const title = nft.title || nft.name || 'Unnamed NFT';
  const description =
    nft.description || nft.rawMetadata?.description || '';

  const attributes =
    nft.rawMetadata?.attributes ||
    nft.rawMetadata?.traits ||
    [];

  return (
    <ChakraProvider theme={theme}>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay
          bg="rgba(10, 14, 39, 0.55)"
          backdropFilter="blur(20px) saturate(180%)"
          sx={{
            backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(102,126,234,0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(246,135,179,0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(56,249,215,0.08) 0%, transparent 50%)
    `,
          }}
        />

        <ModalContent
          bg="linear-gradient(135deg, #050507, #2a0f45)"
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.08)"
          overflow="hidden"
        >
          <ModalBody p={0}>
            <Box px={6} py={5} position="relative">

              {/* 3D FLIP CONTAINER */}
              <Box
                position="relative"
                w="100%"
                h="26rem"
                mb={5}
                sx={{ perspective: '1200px' }}
              >
                <Box
                  position="relative"
                  w="100%"
                  h="100%"
                  transition="transform 0.7s ease"
                  sx={{
                    transformStyle: 'preserve-3d',
                    transform: showAttributes
                      ? 'rotateY(180deg)'
                      : 'rotateY(0deg)',
                  }}
                >
                  {/* FRONT — IMAGE */}
                  <Box
                    position="absolute"
                    inset={0}
                    sx={{
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <Image
                      src={imageUrl}
                      alt={title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      borderRadius="xl"
                      fallback={
                        <Flex
                          w="100%"
                          h="100%"
                          align="center"
                          justify="center"
                          bg="whiteAlpha.100"
                          borderRadius="xl"
                        >
                          No Image
                        </Flex>
                      }
                    />
                  </Box>

                  {/* BACK — ATTRIBUTES */}
                  <Box
                    position="absolute"
                    inset={0}
                    transform="rotateY(180deg)"
                    sx={{
                      backfaceVisibility: 'hidden',
                    }}
                    bg="blackAlpha.700"
                    backdropFilter="blur(12px)"
                    borderRadius="xl"
                    p={4}
                    overflowY="auto"
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      textAlign="center"
                      mb={4}
                      color="white"
                    >
                      Attributes
                    </Text>

                    {attributes.length > 0 ? (
                      <SimpleGrid columns={2} spacing={3}>
                        {attributes.map((attr, idx) => (
                          <Box
                            key={idx}
                            p={3}
                            borderRadius="lg"
                            border="1px solid rgba(255,255,255,0.1)"
                            bg="blackAlpha.500"
                          >
                            <Text
                              fontSize="11px"
                              textTransform="uppercase"
                              letterSpacing="widest"
                              color="whiteAlpha.600"
                            >
                              {attr.trait_type || 'Trait'}
                            </Text>
                            <Text
                              fontSize="sm"
                              fontWeight="500"
                              color="white"
                            >
                              {attr.value}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text
                        textAlign="center"
                        color="whiteAlpha.600"
                        py={8}
                      >
                        No attributes available
                      </Text>
                    )}
                  </Box>
                </Box>

                {/* TOGGLE BUTTON */}
                <Button
                  position="absolute"
                  bottom={2}
                  right={2}
                  size="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  bg="blackAlpha.500"
                  color="whiteAlpha.800"
                  borderRadius="full"
                  px={2}
                  _hover={{ bg: 'blackAlpha.700' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAttributes(!showAttributes);
                  }}
                >
                  {showAttributes ? 'NFT' : 'Attributes'}
                </Button>
              </Box>

              {/* NFT INFO */}
              <Text fontSize="2xl" fontWeight="bold" color="white" mb={1}>
                {title}
              </Text>

              <Text fontSize="sm" color="whiteAlpha.700" mb={6}>
                {description}
              </Text>

              {/* CLOSE */}
              <Button
                w="100%"
                variant="ghost"
                color="whiteAlpha.600"
                _hover={{ color: 'white' }}
                onClick={onClose}
              >
                Close
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}
