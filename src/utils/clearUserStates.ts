import { connectorLocalStorageKey } from 'components/WalletModal';
import { connectorsByName } from './web3React';

export const clearUserStates = () => {
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window?.localStorage?.getItem('walletconnect')) {
        connectorsByName.walletconnect.close();
        connectorsByName.walletconnect.walletConnectProvider = null;
    }
    window?.localStorage?.removeItem(connectorLocalStorageKey);
};
