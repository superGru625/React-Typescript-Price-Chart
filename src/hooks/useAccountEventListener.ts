import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { clearUserStates } from 'utils/clearUserStates';

export const useAccountEventListener = () => {
    const { account, chainId, connector } = useWeb3React();

    useEffect(() => {
        const handleEvent = () => {
            clearUserStates();
        };
        if (account && connector) {
            connector.addListener('Web3ReactDeactivate', handleEvent);
            connector.addListener('Web3ReactUpdate', handleEvent);

            return () => {
                connector.removeListener('Web3ReactDeactivate', handleEvent);
                connector.removeListener('Web3ReactUpdate', handleEvent);
            };
        }
        return undefined;
    }, [account, chainId, connector]);
};
