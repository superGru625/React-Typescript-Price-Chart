import BigNumber from 'bignumber.js';
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';

export const BIG_ZERO = new BigNumber(0);
export const BIG_ONE = new BigNumber(1);
export const BIG_TWO = new BigNumber(2);
export const BIG_NINE = new BigNumber(9);
export const BIG_TEN = new BigNumber(10);

export const ethersToSerializedBigNumber = (ethersBn: EthersBigNumber): SerializedBigNumber =>
    ethersToBigNumber(ethersBn).toJSON();

export const ethersToBigNumber = (ethersBn: EthersBigNumber): BigNumber => new BigNumber(ethersBn.toString());

export const toBigNumber = (value: any) => {
    return new BigNumber(value.toString());
};

export const formatNumber = (value: any, decimal = 4) => {
    return value.toLocaleString(undefined, {
        maximumFractionDigits: decimal
    });
};

export const formatCurrency = (value: any, currency = 'usd', digit = 2) => {
    return value.toLocaleString(undefined, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: digit
    });
};

export const fromWei = (value: any, decimal = 18) => {
    const valueBN = toBigNumber(value);
    const decBN = toBigNumber(10 ** decimal);
    return valueBN.dividedBy(decBN).toNumber();
};

export const toWei = (value: any, decimal = 18) => {
    const valueBN = toBigNumber(value);
    const decBN = toBigNumber(10 ** decimal);
    return valueBN.multipliedBy(decBN);
};
