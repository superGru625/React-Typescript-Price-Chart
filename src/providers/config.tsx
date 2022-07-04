import BigNumber from 'bignumber.js';
import useLocalStorage from 'hooks/useLocalStorage';
import { ConfigContext, initialState } from 'contexts/config';

type ConfigProviderProps = {
    children: React.ReactNode;
};

BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80
});

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const [config, setConfig] = useLocalStorage('rts-config', {
        ...initialState
    });

    const onChangeThemeMode = () => {
        setConfig((prevState) => ({
            ...prevState,
            isDark: !prevState.isDark
        }));
    };

    return <ConfigContext.Provider value={{ ...config, onChangeThemeMode }}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
