import { Box } from '@chakra-ui/react';

export default function AppShell({ children }) {
  return (
    <Box className="app-shell">
      {children}
    </Box>
  );
}
