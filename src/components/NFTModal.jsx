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
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { resolveNFTImage } from '../utils/image';

export default function NFTModal({ nft, isOpen, onClose }) {
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
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay
        bg="blackAlpha.800"
     
      />

      <ModalContent
        bg="linear-gradient(135deg, #050507, #2a0f45)"
        borderRadius="2xl"
        border="1px solid rgba(255,255,255,0.08)"
        overflow="hidden"
        maxH="90vh"
      >
        <ModalBody p={0}>
          <Box p={6} position="relative">
            {/* Flip Container */}
            <Box
              position="relative"
              w="100%"
              h="26rem"
              mb={5}
              sx={{ perspective: '1200px' }}
            >
              <Box
                w="100%"
                h="100%"
                position="relative"
                transition="transform 0.7s ease"
                sx={{
                  transformStyle: 'preserve-3d',
                  transform: showAttributes
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                }}
              >
                {/* Front — Image */}
                <Box
                  position="absolute"
                  inset={0}
                  backfaceVisibility="hidden"
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

                {/* Back — Attributes */}
                <Box
                  position="absolute"
                  inset={0}
                  backfaceVisibility="hidden"
                  sx={{ transform: 'rotateY(180deg)' }}
                  bg="blackAlpha.700"
                  backdropFilter="blur(10px)"
                  borderRadius="xl"
                  p={4}
                  overflowY="auto"
                >
                  <Text
                    fontSize="lg"
                    fontWeight="600"
                    textAlign="center"
                    mb={4}
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

              {/* Toggle Button */}
              <Button
                position="absolute"
                bottom={4}
                right={4}
                size="xs"
                textTransform="uppercase"
                letterSpacing="wider"
                bg="blackAlpha.500"
                color="whiteAlpha.800"
                borderRadius="full"
                px={4}
                _hover={{ bg: 'blackAlpha.700' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAttributes(!showAttributes);
                }}
              >
                {showAttributes ? 'NFT' : 'Attributes'}
              </Button>
            </Box>

            {/* NFT Info */}
            <Text fontSize="2xl" fontWeight="bold" mb={1}>
              {title}
            </Text>

            <Text fontSize="sm" color="whiteAlpha.700" mb={6}>
              {description}
            </Text>

            {/* Close */}
            <Button
              w="100%"
              variant="outline"
              borderRadius="full"
              borderColor="whiteAlpha.300"
              color="whiteAlpha.700"
              _hover={{
                bg: 'whiteAlpha.100',
                color: 'white',
              }}
              onClick={onClose}
            >
              Close
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
