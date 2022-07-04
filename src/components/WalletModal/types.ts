import { FC } from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';

export enum ConnectorNames {
    Injected = 'injected',
    WalletConnect = 'walletconnect',
    BSC = 'bsc',
    Blocto = 'blocto',
    WalletLink = 'walletlink'
}

export type Login = (connectorId: ConnectorNames) => void;

export interface Config {
    title: string;
    icon: FC<SvgIconProps>;
    connectorId: ConnectorNames;
    priority: number | (() => number);
    mobileOnly?: boolean;
    href?: string;
}
