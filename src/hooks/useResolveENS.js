import { useState } from 'react';
import { getEnsAddress } from "@wagmi/core";
import { normalize } from 'viem/ens'
import { config } from '../WagmiWrapper'



export function useResolveENS() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    
 const resolveENS = async (ens) => {
    if (!ens || !ens.endsWith('.eth')) {
        setAddress(ens);
        setLoading(false);
        setError(null);
      return;
    };
    
    try {
        setLoading(true);
        setError(null);
        setAddress(ens);

        const address = await getEnsAddress(config, { 
            name: normalize(ens), 
            chainId: config.chains[0].id 
        });
        console.log('Resolved ENS:', ens, 'to address:', address);
        setAddress(address);
    }
    catch (error) {
        console.error('ENS resolution failed:', err);
      setError('Failed to resolve ENS');
    }
    finally {
        setLoading(false);
    }
}

return { address, loading, error, resolveENS };
}


