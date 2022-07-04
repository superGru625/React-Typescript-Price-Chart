import sample from 'lodash/sample';

if (
    process.env.NODE_ENV !== 'production' &&
    (!process.env.REACT_APP_PUBLIC_NODE || !process.env.REACT_APP_PUBLIC_NODE_TESTNET)
) {
    throw Error('One base RPC URL is undefined');
}

// Array of available nodes to connect to
export const nodes = [
    process.env.REACT_APP_PUBLIC_CHAIN_ID === '56'
        ? process.env.REACT_APP_PUBLIC_NODE
        : process.env.REACT_APP_PUBLIC_NODE_TESTNET
];

const getNodeUrl = () => {
    // Use custom node if available (both for development and production)
    // However on the testnet it wouldn't work, so if on testnet - comment out the REACT_APP_PUBLIC_NODE_PRODUCTION from env file
    if (process.env.REACT_APP_PUBLIC_NODE_PRODUCTION) {
        return process.env.REACT_APP_PUBLIC_NODE_PRODUCTION;
    }
    return sample(nodes);
};

export default getNodeUrl;
