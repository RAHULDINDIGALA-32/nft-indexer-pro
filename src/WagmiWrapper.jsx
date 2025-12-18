import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

// In Vite apps use `import.meta.env` (env vars must be prefixed with VITE_)

const config = getDefaultConfig({
  appName: 'NFT Indexer App',
  projectId: '4a50075a91f8215a811ccbcb6e5f0ae5',
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
  transports: {
    [mainnet.id] : http(import.meta.env.VITE_MAINNET_RPC_URL),
    [sepolia.id] : http(import.meta.env.VITE_SEPOLIA_RPC_URL)
  }
});

const queryClient = new QueryClient();

const WagmiWrapper = ({children}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WagmiWrapper;