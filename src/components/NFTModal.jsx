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
} from '@chakra-ui/react';
import { resolveNFTImage } from '../utils/image';

export default function NFTModal({ nft, isOpen, onClose }) {
  const [showAttributes, setShowAttributes] = useState(false);
  
  if (!nft) return null;

  const imageUrl = resolveNFTImage(nft);
  const title = nft.title || nft.name || 'Unnamed NFT';
  const description = nft.description || nft.rawMetadata?.description || '';
  
  // Extract attributes from metadata
  const attributes = nft.rawMetadata?.attributes || 
                     nft.rawMetadata?.traits || 
                     (nft.rawMetadata?.properties?.traits ? 
                       Object.entries(nft.rawMetadata.properties.traits).map(([trait_type, value]) => ({
                         trait_type,
                         value: typeof value === 'object' ? value.value || JSON.stringify(value) : value
                       })) : []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="md"
      motionPreset="scale"
    >
      <ModalOverlay
        bg="blackAlpha.800"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        background="linear-gradient(to bottom right, rgba(0, 0, 0, 0.95), rgba(88, 28, 135, 0.9))"
        borderRadius="2xl"
        border="1px solid rgba(255, 255, 255, 0.1)"
        maxW="md"
        maxH="90vh"
        overflowY="auto"
        className="modal-content"
      >
        <ModalBody p={0} onClick={(e) => e.stopPropagation()}>
          <Box px={6} py={5} position="relative">
            {/* 3D Flip Container */}
            <Box
              className="perspective-container"
              position="relative"
              width="100%"
              height="26rem"
              mb={5}
            >
              <Box
                className={`flip-card-inner ${showAttributes ? 'flipped' : ''}`}
              >
                {/* Front - NFT Image */}
                <Box className="flip-card-front">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    borderRadius="xl"
                    fallback={
                      <Box
                        width="100%"
                        height="100%"
                        background="linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(246, 135, 179, 0.2) 100%)"
                        borderRadius="xl"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="rgba(255, 255, 255, 0.5)"
                      >
                        No Image
                      </Box>
                    }
                  />
                </Box>

                {/* Back - Attributes */}
                <Box className="flip-card-back">
                  <Box
                    borderRadius="xl"
                    background="rgba(0, 0, 0, 0.7)"
                    backdropFilter="blur(10px)"
                    p={4}
                    height="100%"
                    overflowY="auto"
                  >
                    <Text
                      fontSize="lg"
                      fontWeight="600"
                      mb={4}
                      textAlign="center"
                      color="white"
                    >
                      Attributes
                    </Text>

                    {attributes && attributes.length > 0 ? (
                      <SimpleGrid columns={2} spacing={3}>
                        {attributes.map((attr, idx) => (
                          <Box
                            key={idx}
                            border="1px solid rgba(255, 255, 255, 0.1)"
                            borderRadius="lg"
                            p={3}
                            background="rgba(0, 0, 0, 0.4)"
                          >
                            <Text
                              fontSize="11px"
                              textTransform="uppercase"
                              letterSpacing="wider"
                              color="rgba(255, 255, 255, 0.5)"
                              mb={1}
                            >
                              {attr.trait_type || attr.name || 'Trait'}
                            </Text>
                            <Text
                              fontSize="sm"
                              fontWeight="500"
                              color="white"
                            >
                              {attr.value || JSON.stringify(attr)}
                            </Text>
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text
                        fontSize="sm"
                        color="rgba(255, 255, 255, 0.5)"
                        textAlign="center"
                        py={8}
                      >
                        No attributes available
                      </Text>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Toggle Button */}
            <Button
              position="absolute"
              bottom="23vh"
              right={4}
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wide"
              color="rgba(255, 255, 255, 0.7)"
              background="rgba(0, 0, 0, 0.4)"
              borderRadius="2xl"
              px={4}
              py={2}
              _hover={{
                color: 'white',
                background: 'rgba(0, 0, 0, 0.6)',
              }}
              onClick={() => setShowAttributes(!showAttributes)}
            >
              {showAttributes ? 'NFT' : 'Attributes'}
            </Button>

            {/* NFT Info */}
            <Text fontSize="2xl" fontWeight="bold" mt={5} mb={1} color="white">
              {title}
            </Text>
            <Text fontSize="sm" color="rgba(255, 255, 255, 0.7)" mb={6}>
              {description}
            </Text>

            {/* Close Button */}
            <Button
              width="100%"
              mt={3}
              color="rgba(255, 255, 255, 0.5)"
              background="transparent"
              border="1px solid rgba(255, 255, 255, 0.1)"
              _hover={{
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.05)',
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

