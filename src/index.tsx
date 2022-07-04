import App from './App';

import {
    Root,
    MuiThemeProvider,
    ConfigProvider,
    ToastsProvider,
    ModalProvider,
    Web3ReactProvider,
    APIProvider
} from './providers';

Root.render(
    <ConfigProvider>
        <MuiThemeProvider>
            <APIProvider>
                <Web3ReactProvider>
                    <ToastsProvider>
                        <ModalProvider>
                            <App />
                        </ModalProvider>
                    </ToastsProvider>
                </Web3ReactProvider>
            </APIProvider>
        </MuiThemeProvider>
    </ConfigProvider>
);
