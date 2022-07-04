import { simpleRpcProvider } from 'utils/providers';

export const getBnbBalance = (account: string) => {
    return simpleRpcProvider.getBalance(account);
};
