import React, { createContext, useState } from 'react';

import { Handler, ModalProviderProps } from './types';

import Dialog from '@mui/material/Dialog';

interface ModalsContext {
    isOpen: boolean;
    nodeId: string;
    modalNode: React.ReactNode;
    setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void;
    onDismiss: Handler;
}

export const Context = createContext<ModalsContext>({
    isOpen: false,
    nodeId: '',
    modalNode: null,
    setModalNode: () => null,
    onPresent: () => null,
    onDismiss: () => null
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalNode, setModalNode] = useState<React.ReactNode>();
    const [nodeId, setNodeId] = useState('');

    const handlePresent = (node: React.ReactNode, newNodeId: string) => {
        setModalNode(node);
        setIsOpen(true);
        setNodeId(newNodeId);
    };

    const handleDismiss = () => {
        setModalNode(undefined);
        setIsOpen(false);
        setNodeId('');
    };

    return (
        <Context.Provider
            value={{
                isOpen,
                nodeId,
                modalNode,
                setModalNode,
                onPresent: handlePresent,
                onDismiss: handleDismiss
            }}
        >
            <Dialog open={isOpen} onClose={handleDismiss}>
                {React.isValidElement(modalNode) &&
                    React.cloneElement(modalNode, {
                        onDismiss: handleDismiss
                    })}
            </Dialog>
            {children}
        </Context.Provider>
    );
};

export default ModalProvider;
