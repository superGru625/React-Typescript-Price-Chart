import { useCallback } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import {
    NoEthereumProviderError,
    UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector';
import {
    UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
    WalletConnectConnector
} from '@web3-react/walletconnect-connector';
import { ConnectorNames, connectorLocalStorageKey } from 'components/WalletModal';
import { connectorsByName } from 'utils/web3React';
import { setupNetwork } from 'utils/wallet';

import useToast from 'hooks/useToast';

import { Box, Link, Typography } from '@mui/material';

const useAuth = () => {
    const { activate, deactivate, setError } = useWeb3React();
    const { toastError } = useToast();

    const login = useCallback(
        async (connectorID: ConnectorNames) => {
            const connectorOrGetConnector = connectorsByName[connectorID];
            const connector =
                typeof connectorOrGetConnector !== 'function'
                    ? connectorsByName[connectorID]
                    : await connectorOrGetConnector();

            if (typeof connector !== 'function' && connector) {
                activate(connector, async (error: Error) => {
                    if (error instanceof UnsupportedChainIdError) {
                        setError(error);
                        const provider = await connector.getProvider();
                        const hasSetup = await setupNetwork(provider);
                        if (hasSetup) {
                            activate(connector);
                        }
                    } else {
                        window?.localStorage?.removeItem(connectorLocalStorageKey);
                        if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
                            toastError(
                                'Provider Error',
                                <Box>
                                    <Typography>{'No provider was found'}</Typography>
                                    <Link href="https://docs.pancakeswap.finance/get-started/connection-guide">
                                        {'Need help ?'}
                                    </Link>
                                </Box>
                            );
                        } else if (
                            error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
                        ) {
                            if (connector instanceof WalletConnectConnector) {
                                const walletConnector = connector as WalletConnectConnector;
                                walletConnector.walletConnectProvider = null;
                            }
                            toastError('Authorization Error', 'Please authorize to access your account');
                        } else {
                            toastError(error.name, error.message);
                        }
                    }
                });
            } else {
                window?.localStorage?.removeItem(connectorLocalStorageKey);
                toastError('Unable to find connector', 'The connector config is wrong');
            }
        },
        [activate, toastError, setError]
    );

    const logout = useCallback(() => {
        deactivate();
    }, [deactivate]);

    return { login, logout };
};

export default useAuth;
