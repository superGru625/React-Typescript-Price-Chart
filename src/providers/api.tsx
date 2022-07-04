import { useState, useEffect } from 'react';
import { APIContext } from 'contexts/api';
import { USED_TOKENS_LIST } from 'config/constants/api';
import useLocalStorage from 'hooks/useLocalStorage';

import axios from 'utils/axios';

type APIProviderProps = {
    children: React.ReactNode;
};

const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
    const [tokens, setTokens] = useState<any>(0);
    const [currencies, setCurrencies] = useState<any>([]);
    const [activeCurrency, setActiveCurrency] = useState<string>('usd');

    const [tokensList, setTokensList] = useLocalStorage('tokens-list', []);
    const [sCurrencies, setSCurrencies] = useLocalStorage('supported-currencies', []);
    const [currenciesList, setCurrenciesList] = useLocalStorage('currencies-list', []);

    const getSupportedCurrencyList = async () => {
        try {
            const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies');
            if (!data) return sCurrencies;
            setSCurrencies(data);
            return data;
        } catch {
            return sCurrencies;
        }
    };

    const getCurrenyObject = (f, s) => {
        let array = [];
        for (let currency in f) {
            const id = currency.toLowerCase();
            const isExist = s.indexOf(id) < 0 ? false : true;
            if (!isExist) continue;
            array.push({
                id: id,
                currency: f[currency]
            });
        }
        return array;
    };

    const getCurrencyList = async () => {
        try {
            const { data } = await axios.get(
                'https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false'
            );
            if (!data) return currenciesList;
            const supported = await getSupportedCurrencyList();
            const list = getCurrenyObject(data, supported);
            setCurrenciesList(list);
            return list;
        } catch {
            return currenciesList;
        }
    };

    const getTokens = async () => {
        try {
            const ids = USED_TOKENS_LIST.join(',');
            const { data } = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${activeCurrency}&ids=${encodeURIComponent(
                    ids
                )}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
            );
            if (!data) return tokensList;
            let temp = {};
            data.forEach((token) => {
                temp[token.id] = token;
            });
            setTokensList(temp);
            return temp;
        } catch {
            return tokensList;
        }
    };

    const onChangeCurrency = (currency) => {
        setActiveCurrency(currency);
    };

    useEffect(() => {
        let interval = null;
        interval = setInterval(async () => {
            try {
                setTokens(await getTokens());
                if (!currencies.length) {
                    setCurrencies(await getCurrencyList());
                }
            } catch (e) {
                console.log(e.toString());
            }
        }, 12000);
        (async () => {
            setCurrencies(await getCurrencyList());
            setTokens(await getTokens());
        })();
        return () => clearInterval(interval);
    }, [activeCurrency]);

    return (
        <APIContext.Provider value={{ tokens, currencies, activeCurrency, onChangeCurrency }}>
            {children}
        </APIContext.Provider>
    );
};

export default APIProvider;
