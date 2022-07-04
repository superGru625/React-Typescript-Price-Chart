import type { Signer } from '@ethersproject/abstract-signer';
import type { Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { simpleRpcProvider } from 'utils/providers';

// Addresses
import { getTokenAddress, getMulticallAddress } from 'utils/addressHelpers';

// ABI
import bep20 from 'config/abi/bep20.json';
import multicall from 'config/abi/multicall.json';

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
    const signerOrProvider = signer ?? simpleRpcProvider;
    return new Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (signer?: Signer | Provider) => {
    return getContract(bep20, getTokenAddress(), signer);
};
export const getMulticallContract = (signer?: Signer | Provider) => {
    return getContract(multicall, getMulticallAddress(), signer);
};
