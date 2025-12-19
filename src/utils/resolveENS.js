import { getEnsAddress } from "@wagmi/core";
import { normalize } from 'viem/ens'
import { config } from '../WagmiWrapper'

 const resolveENS = async (ens) => {
    if (!ens || !ens.endsWith('.eth')) return null;
    try {
        const address = await getEnsAddress(config, { 
            name: normalize(ens), 
            chainId: config.chains[0].id 
        });
        console.log('Resolved ENS:', ens, 'to address:', address);
        return address;
    }
    catch (error) {
        console.error('ENS resolution failed:', err);
        return null;
    }
}

export default resolveENS;