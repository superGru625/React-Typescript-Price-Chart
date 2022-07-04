import { useAccountEventListener } from 'hooks/useAccountEventListener';
import useEagerConnect from 'hooks/useEagerConnect';

const GlobalHooks = () => {
    useEagerConnect();
    useAccountEventListener();
    return <></>;
};

export default GlobalHooks;
