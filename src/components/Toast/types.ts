import { AlertColor } from '@mui/material';
import { ReactNode } from 'react';

export interface Toast {
    id: string;
    type: AlertColor;
    title: string;
    description?: ReactNode;
}

export interface ToastContainerProps {
    toasts: Toast[];
    stackSpacing?: number;
    ttl?: number;
    onRemove: (id: string) => void;
}

export interface ToastProps {
    toast: Toast;
    onRemove: ToastContainerProps['onRemove'];
    ttl: number;
    style: Partial<CSSStyleDeclaration>;
}
