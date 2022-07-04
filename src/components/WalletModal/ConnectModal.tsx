import React, { useState } from 'react';
import WalletCard from './WalletCard';
import config, { walletLocalStorageKey } from './config';
import { Config, Login } from './types';

import { isMobile } from 'react-device-detect';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
interface Props {
    login: Login;
    onDismiss?: () => void;
    displayCount?: number;
}

const getPriority = (priority: Config['priority']) => (typeof priority === 'function' ? priority() : priority);

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
    const sortedConfig = walletConfig.sort((a: Config, b: Config) => getPriority(a.priority) - getPriority(b.priority));

    const preferredWalletName = localStorage?.getItem(walletLocalStorageKey);

    if (!preferredWalletName) {
        return sortedConfig;
    }

    const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

    if (!preferredWallet) {
        return sortedConfig;
    }

    return [
        preferredWallet,
        ...sortedConfig
            .filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName)
            .filter((sortedWalletConfig) =>
                typeof sortedWalletConfig.mobileOnly === 'boolean' ? sortedWalletConfig.mobileOnly && isMobile : true
            )
    ];
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3 }) => {
    const [showMore, setShowMore] = useState(false);
    const sortedConfig = getPreferredConfig(config);
    // Filter out WalletConnect if user is inside TrustWallet built-in browser
    const walletsToShow = window.ethereum?.isTrust
        ? sortedConfig.filter((wallet) => wallet.title !== 'WalletConnect')
        : sortedConfig;
    const displayListConfig = showMore ? walletsToShow : walletsToShow.slice(0, displayCount);

    return (
        <Card
            sx={{
                width: '100%',
                maxWidth: (theme) => theme.spacing(45)
            }}
        >
            <CardHeader
                title="Connect Wallet"
                titleTypographyProps={{
                    variant: 'h6'
                }}
                action={
                    <IconButton onClick={onDismiss}>
                        <CloseRoundedIcon />
                    </IconButton>
                }
            />
            <Divider />
            <CardContent
                sx={{
                    padding: (theme) => theme.spacing(4, 3),
                    maxHeight: (theme) => theme.spacing(60),
                    overflow: 'auto'
                }}
            >
                <Grid container spacing={1.5}>
                    {displayListConfig.map((wallet) => (
                        <WalletCard key={wallet.title} walletConfig={wallet} login={login} onDismiss={onDismiss} />
                    ))}
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <CardActionArea onClick={() => setShowMore(!showMore)}>
                                <Stack
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                        py: 2.5
                                    }}
                                >
                                    <MoreHorizRoundedIcon
                                        sx={{
                                            color: 'text.secondary',
                                            width: 40,
                                            height: 'auto',
                                            mb: 1
                                        }}
                                    />
                                    <Typography>{showMore ? 'Less' : 'More'}</Typography>
                                </Stack>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ConnectModal;
