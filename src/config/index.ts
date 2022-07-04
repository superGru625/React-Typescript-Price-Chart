import { EnvProps, ConfigProps } from 'types/config';
import { CHAIN_ID } from './constants/networks';

const NODE_ENV = process.env.NODE_ENV;

// ** Secret config variables should be located in .env. [Todo]
const ENV: EnvProps = {
    development: {},
    production: {},
    test: {}
};

const Config: ConfigProps = {
    env: ENV[NODE_ENV],
    isDark: true
};

export const CIDS = {
    MAINNET: 56,
    TESTNET: 97
};

export const MAX_RATE = 300;
export const PER_PAGE = 10;

export const BASE_BSC_SCAN_URLS = {
    [CIDS.MAINNET]: 'https://bscscan.com',
    [CIDS.TESTNET]: 'https://testnet.bscscan.com'
};

export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[CHAIN_ID];

export default Config;
