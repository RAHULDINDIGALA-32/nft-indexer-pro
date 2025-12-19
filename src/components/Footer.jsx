import { Box, Text, Link, Icon } from "@chakra-ui/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <Box
      as="footer"
      mt={60}
      py={6}
      textAlign="center"
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        color="purple.400"
      >
        Built with{" "}
        <HeartIcon
          width={16}
          height={16}
          style={{ verticalAlign: "middle", color: "var(--chakra-colors-pink-400)" }}
        />{" "}
        by Rahul Dindigala
      </Text>

      <Text
        mt={1}
        fontWeight="semibold"
        textDecor="underline"
        textUnderlineOffset="2px"
      >
        <Link
          href="https://github.com/RAHULDINDIGALA-32"
          isExternal
          color="pink.400"
          _hover={{ opacity: 0.8 }}
          transition="opacity 0.2s"
        >
          GitHub
        </Link>
      </Text>
    </Box>
  );
}
