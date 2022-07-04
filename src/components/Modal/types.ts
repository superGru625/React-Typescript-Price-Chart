import React from 'react';

export interface ModalTheme {
    background: string;
}

export type Handler = () => void;

export interface InjectedProps {
    onDismiss?: Handler;
}

export interface ModalProps extends InjectedProps {
    title: string;
    hideCloseButton?: boolean;
    onBack?: () => void;
    bodyPadding?: string;
    headerBackground?: string;
    minWidth?: string;
    children: React.ReactNode;
}

export type ModalProviderProps = {
    children: React.ReactNode;
};
