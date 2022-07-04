import { useModal } from '../Modal';
import ConnectModal from './ConnectModal';
import { Login } from './types';

interface ReturnType {
    onPresentConnectModal: () => void;
}

const useWalletModal = (login: Login, logout: () => void): ReturnType => {
    const [onPresentConnectModal] = useModal(<ConnectModal login={login} />);
    return { onPresentConnectModal };
};

export default useWalletModal;
