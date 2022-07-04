import React from 'react';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({
    title,
    onDismiss,
    onBack,
    children,
    hideCloseButton = false,
    bodyPadding = '24px',
    headerBackground = 'transparent',
    minWidth = '320px',
    ...props
}) => {
    return (
        <>
            {title}
            {children}
        </>
    );
};

export default Modal;
