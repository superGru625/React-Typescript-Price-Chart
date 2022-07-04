import { Web3ReactProvider } from '@web3-react/core';

import { getLibrary } from 'utils/web3React';

type Web3ProviderProps = {
    children: React.ReactNode;
};

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
    return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
};

export default Web3Provider;
