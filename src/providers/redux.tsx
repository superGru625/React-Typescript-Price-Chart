import { Provider } from 'react-redux';

import store from 'state';

type ReduxProviderProps = {
    children: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
