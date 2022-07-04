import GlobalHooks from 'components/GlobalHooks';

import { ToastListener } from 'contexts/ToastsContext';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

function App() {
    return (
        <BrowserRouter basename="">
            <GlobalHooks />
            <Routes />
            <ToastListener />
        </BrowserRouter>
    );
}

export default App;
