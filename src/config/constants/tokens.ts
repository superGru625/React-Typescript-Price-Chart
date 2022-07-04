import { CIDS } from 'config';
import { Token } from 'types/token';
import { CHAIN_ID } from './networks';

const { MAINNET, TESTNET } = CIDS;

interface TokenList {
    [symbol: string]: Token;
}

const defineTokens = <T extends TokenList>(t: T) => t;

export const mainnetTokens = defineTokens({
    wbnb: {
        chainId: MAINNET,
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        decimals: 18,
        symbol: 'WBNB',
        name: 'Wrapped BNB',
        projectLink: 'https://www.binance.com/'
    },
    bnb: {
        chainId: MAINNET,
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        decimals: 18,
        symbol: 'BNB',
        name: 'BNB',
        projectLink: 'https://www.binance.com/'
    },
    busd: {
        chainId: MAINNET,
        address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        decimals: 18,
        symbol: 'BUSD',
        name: 'Binance USD',
        projectLink: 'https://www.paxos.com/busd/'
    }
} as const);

export const testnetTokens = defineTokens({
    wbnb: {
        chainId: TESTNET,
        address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        decimals: 18,
        symbol: 'WBNB',
        name: 'Wrapped BNB',
        projectLink: 'https://www.binance.com/'
    },
    bnb: {
        chainId: TESTNET,
        address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        decimals: 18,
        symbol: 'BNB',
        name: 'BNB',
        projectLink: 'https://www.binance.com/'
    },
    busd: {
        chainId: TESTNET,
        address: '0x228CB512d18DA79e49dD378aF9722fa76a605cE3',
        decimals: 18,
        symbol: 'BUSD',
        name: 'Binance USD',
        projectLink: 'https://www.paxos.com/busd/'
    }
} as const);

const tokens = () => {
    const chainId = CHAIN_ID;

    // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
    if (parseInt(chainId, 10) === TESTNET) {
        return Object.keys(mainnetTokens).reduce((accum, key) => {
            return {
                ...accum,
                [key]: testnetTokens[key] || mainnetTokens[key]
            };
        }, {} as typeof testnetTokens & typeof mainnetTokens);
    }

    return mainnetTokens;
};

const unserializedTokens = tokens();
export default unserializedTokens;
