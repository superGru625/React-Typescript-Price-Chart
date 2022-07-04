import { createContext } from 'react';

// project import
import defaultConfig from 'config';

// initial state
const initialState: any = {
    ...defaultConfig
};

const ConfigContext = createContext(initialState);

export { ConfigContext, initialState };
