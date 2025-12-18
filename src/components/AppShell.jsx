import { Box } from '@chakra-ui/react';

export default function AppShell({ children }) {
  return (
    <Box 
      className="app-shell"
      minHeight="100vh"
      position="relative"
      zIndex={1}
    >
      {children}
    </Box>
  );
}
