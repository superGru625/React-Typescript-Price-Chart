import { CIDS } from 'config';
import { CHAIN_ID } from 'config/constants/networks';
import { Address } from 'config/constants/types';

import addresses from 'config/constants/contracts';

export const getAddress = (address: Address): string => {
    return address[CHAIN_ID] ? address[CHAIN_ID] : address[CIDS.MAINNET];
};
export const getTokenAddress = () => {
    return getAddress(addresses.token);
};
export const getMulticallAddress = () => {
    return getAddress(addresses.multiCall);
};
