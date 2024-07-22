import { useEffect, useState } from 'react';
import { getChainById } from 'eth-chainlist';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';

const useCheckNetwork = () => {
  const { chainId, isConnected } = useAccount();
  const [wrongNetwork, setWrongNetwork] = useState<boolean>(false);

  useEffect(() => {
    if (chainId) {
      const chain_ = getChainById(chainId as number);
      if (isConnected && (process.env.NEXT_PUBLIC_NETWORK?.toLowerCase() !== chain_?.name?.toLowerCase())) {
        setWrongNetwork(true);
        toast.error('Use Blockchain ' + process.env.NEXT_PUBLIC_NETWORK?.toUpperCase());
      } else {
        setWrongNetwork(false);
      }
    }
  }, [chainId, isConnected]);

  return wrongNetwork;
};

export default useCheckNetwork;