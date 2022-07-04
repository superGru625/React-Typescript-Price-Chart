// ** React Methods ** //
import { useState, useEffect, useContext } from 'react';

// ** Material UI Components ** //
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popover from '@mui/material/Popover';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

// ** Material UI Icons ** //
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

// ** Hooks ** //
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useWeb3React } from '@web3-react/core';
import { useWalletModal } from './WalletModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMainTokenContract } from 'hooks/useContract';

// ** Utils ** //
import { BASE_BSC_SCAN_URL } from 'config';
import { formatCurrency, formatNumber, fromWei } from 'utils/bigNumber';

// ** Extra Components ** //
import { CopyToClipboard } from 'react-copy-to-clipboard';

// ** Contexts ** //
import { APIContext } from 'contexts/api';

// ** Config ** //
import tokens from 'config/constants/tokens';

// ** Types ** //
import { ThemeOptions } from '@mui/material';
import { getBnbBalance } from 'utils/web3';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useWeb3React();
    const { login, logout } = useAuth();
    const { tokens: tokenData, activeCurrency, currencies, onChangeCurrency } = useContext(APIContext);
    const { isDark, onChangeThemeMode } = useConfig();
    const { onPresentConnectModal } = useWalletModal(login, logout);

    const [balance, setBalance] = useState<any>({});
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const trigger = useScrollTrigger({ disableHysteresis: true });
    const isMobile = useMediaQuery((theme: ThemeOptions) => theme.breakpoints.down('sm'));

    const tokenContract = useMainTokenContract();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDarkMode = (event: React.MouseEvent<HTMLElement>, value: string | null) => {
        if (value === 'light' && isDark) {
            onChangeThemeMode();
        } else if (value === 'dark' && !isDark) {
            onChangeThemeMode();
        } else {
            return value;
        }
    };

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setIsOpenDrawer(!isOpenDrawer);
    };

    const handleActiveTab = (e: React.SyntheticEvent, newTab: string) => {
        if (isMobile) setIsOpenDrawer(false);
        navigate(`/${newTab}`);
    };

    useEffect(() => {
        if (!account) return;
        getBnbBalance(account).then((result) => setBalance((prevState) => ({ ...prevState, bnb: result })));
        tokenContract.balanceOf(account).then((result) =>
            setBalance((prevState) => ({
                ...prevState,
                busd: result
            }))
        );
    }, [account]);
    useEffect(() => {
        const { pathname } = location;
        const mRouter = pathname.split('/')[1];
        if (!mRouter) return;
        setActiveTab(mRouter);
    }, [location]);

    const open = Boolean(anchorEl);

    return (
        <AppBar
            position={trigger ? 'fixed' : 'static'}
            color="primary"
            sx={{
                bgcolor: 'transparent',
                backgroundImage: 'none',
                boxShadow: 'none',
                marginLeft: 0,
                transition: '.5s',
                width: '100%',
                padding: (theme) => theme.spacing(4, 9)
            }}
        >
            <Toolbar
                sx={{
                    padding: '0px !important',
                    height: (theme) => theme.spacing(8.5)
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        height: '100%'
                    }}
                >
                    React Typescript
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
                {!isMobile && (
                    <Tabs
                        value={activeTab}
                        onChange={handleActiveTab}
                        TabIndicatorProps={{
                            sx: {
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                height: '100%',
                                zIndex: 1
                            }
                        }}
                        sx={{
                            height: '100%',
                            alignItems: 'center',
                            ml: 5,
                            '& .MuiTabs-flexContainer': {
                                position: 'relative',
                                zIndex: 2,
                                height: '100%'
                            }
                        }}
                    >
                        <Tab value="dashboard" label="Dashboard" />
                        <Tab value="page1" label="Page1" />
                        <Tab value="page2" label="Page2" />
                    </Tabs>
                )}
                <Box sx={{ flexGrow: 1 }} />
                {!isMobile ? (
                    <>
                        {account && (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}
                                sx={{
                                    bgcolor: 'background.paper',
                                    padding: (theme) => theme.spacing(0.5, 1.5),
                                    borderRadius: '6px',
                                    height: (theme) => theme.spacing(6),
                                    mr: 1
                                }}
                            >
                                <Box
                                    component="img"
                                    sx={{
                                        height: (theme) => theme.spacing(2.125)
                                    }}
                                    src={require('../assets/img/bnb.png')}
                                />
                                <Stack>
                                    <Typography
                                        color="textSecondary"
                                        sx={{
                                            fontSize: (theme) => theme.spacing(1.75),
                                            fontWeight: '500'
                                        }}
                                    >
                                        {(() => {
                                            if (!balance.bnb) {
                                                return (
                                                    <Skeleton
                                                        sx={{
                                                            minWidth: (theme) => theme.spacing(10)
                                                        }}
                                                        animation="wave"
                                                    />
                                                );
                                            }
                                            return `${formatNumber(fromWei(balance.bnb))} BNB`;
                                        })()}
                                    </Typography>
                                    <Typography color="textSecondary" variant="caption">
                                        {(() => {
                                            if (!balance.bnb || !tokenData.binancecoin) {
                                                return (
                                                    <Skeleton
                                                        sx={{
                                                            minWidth: (theme) => theme.spacing(10)
                                                        }}
                                                        animation="wave"
                                                    />
                                                );
                                            }
                                            return `≈ ${formatCurrency(
                                                fromWei(balance.bnb) * tokenData.binancecoin.current_price,
                                                activeCurrency
                                            )}`;
                                        })()}
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
                        {account ? (
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                    bgcolor: 'background.paper',
                                    padding: (theme) => theme.spacing(0.5),
                                    borderRadius: '6px'
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton size="small">
                                        <AccountBalanceWalletRoundedIcon />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary">
                                        {account &&
                                            `${account.substring(0, isMobile ? 6 : 8)} ... ${account.substring(
                                                account.length - (isMobile ? 4 : 8)
                                            )}`}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.25}>
                                        <CopyToClipboard text={account}>
                                            <IconButton size="small">
                                                <ContentCopyRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </CopyToClipboard>
                                        <Link
                                            underline="none"
                                            target="_blank"
                                            href={`${BASE_BSC_SCAN_URL}/address/${account}`}
                                        >
                                            <IconButton size="small">
                                                <TravelExploreRoundedIcon fontSize="small" />
                                            </IconButton>
                                        </Link>
                                    </Stack>
                                </Stack>
                                <IconButton
                                    onClick={logout}
                                    sx={{
                                        bgcolor: 'background.paper',
                                        ml: 1
                                    }}
                                >
                                    <LogoutRoundedIcon />
                                </IconButton>
                            </Stack>
                        ) : (
                            <Button
                                startIcon={
                                    <Box
                                        component="img"
                                        src={require('../assets/img/icons/wallet.svg').default}
                                        alt={'Wallet'}
                                        sx={{
                                            width: (theme) => theme.spacing(3)
                                        }}
                                    />
                                }
                                onClick={onPresentConnectModal}
                                size="large"
                                variant="contained"
                            >
                                Connect Wallet
                            </Button>
                        )}
                    </>
                ) : (
                    <Stack direction="row">
                        <Stack
                            sx={{
                                ml: 1,
                                padding: 0.5,
                                bgcolor: 'background.paper',
                                borderRadius: 1
                            }}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <IconButton sx={{ bgcolor: 'background.paper' }} onClick={toggleDrawer}>
                                <MenuRoundedIcon />
                            </IconButton>
                        </Stack>
                        {!account && (
                            <Stack
                                sx={{
                                    ml: 1,
                                    padding: 0.5,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1
                                }}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <IconButton sx={{ bgcolor: 'background.paper' }} onClick={onPresentConnectModal}>
                                    <Box
                                        component="img"
                                        src={require('../assets/img/icons/wallet.svg').default}
                                        alt={'Wallet'}
                                        sx={{
                                            width: (theme) => theme.spacing(3)
                                        }}
                                    />
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>
                )}
                <Stack
                    sx={{
                        ml: 1,
                        padding: 0.5,
                        bgcolor: 'background.paper',
                        borderRadius: 1
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <IconButton sx={{ bgcolor: 'background.paper' }} onClick={handleClick}>
                        <ManageAccountsRoundedIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                PaperProps={{
                    sx: {
                        maxWidth: 350,
                        width: '100%'
                    }
                }}
            >
                <Card>
                    {account && (
                        <>
                            <Typography sx={{ p: 2 }}>Connected Wallet</Typography>
                            <Divider />
                            <CardContent component={Stack} spacing={2}>
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Wallet
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{
                                            bgcolor: 'background.paper',
                                            padding: (theme) => theme.spacing(0.5),
                                            borderRadius: '6px'
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{
                                                flexGrow: 1
                                            }}
                                        >
                                            <IconButton size="small">
                                                <AccountBalanceWalletRoundedIcon />
                                            </IconButton>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{
                                                    flexGrow: 1,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {account &&
                                                    `${account.substring(0, isMobile ? 6 : 8)} ... ${account.substring(
                                                        account.length - (isMobile ? 4 : 6)
                                                    )}`}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.25}>
                                                <CopyToClipboard text={account}>
                                                    <IconButton size="small">
                                                        <ContentCopyRoundedIcon fontSize="small" />
                                                    </IconButton>
                                                </CopyToClipboard>
                                                <Link
                                                    underline="none"
                                                    target="_blank"
                                                    href={`${BASE_BSC_SCAN_URL}/address/${account}`}
                                                >
                                                    <IconButton size="small">
                                                        <TravelExploreRoundedIcon fontSize="small" />
                                                    </IconButton>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                        <IconButton
                                            onClick={logout}
                                            sx={{
                                                bgcolor: 'background.paper',
                                                ml: 1
                                            }}
                                        >
                                            <LogoutRoundedIcon />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                                <Stack spacing={0.5}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        Balance
                                    </Typography>
                                    <Stack direction="row" spacing={0.5}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{
                                                bgcolor: 'background.paper',
                                                flexGrow: 1,
                                                padding: (theme) => theme.spacing(0.5, 1.5),
                                                borderRadius: '6px',
                                                height: (theme) => theme.spacing(6),
                                                mr: 1
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: (theme) => theme.spacing(3)
                                                }}
                                                src={require('../assets/img/bnb.png')}
                                            />
                                            <Stack>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: (theme) => theme.spacing(1.75),
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {(() => {
                                                        if (!balance.bnb) {
                                                            return (
                                                                <Skeleton
                                                                    sx={{
                                                                        minWidth: (theme) => theme.spacing(10)
                                                                    }}
                                                                    animation="wave"
                                                                />
                                                            );
                                                        }
                                                        return `${formatNumber(fromWei(balance.bnb))} BNB`;
                                                    })()}
                                                </Typography>
                                                <Typography color="textSecondary" variant="caption">
                                                    {(() => {
                                                        if (!balance.bnb || !tokenData.binancecoin) {
                                                            return (
                                                                <Skeleton
                                                                    sx={{
                                                                        minWidth: (theme) => theme.spacing(10)
                                                                    }}
                                                                    animation="wave"
                                                                />
                                                            );
                                                        }
                                                        return `≈ ${formatCurrency(
                                                            fromWei(balance.bnb) * tokenData.binancecoin.current_price,
                                                            activeCurrency
                                                        )}`;
                                                    })()}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            sx={{
                                                bgcolor: 'background.paper',
                                                flexGrow: 1,
                                                padding: (theme) => theme.spacing(0.5, 1.5),
                                                borderRadius: '6px',
                                                height: (theme) => theme.spacing(6),
                                                mr: 1
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                sx={{
                                                    height: (theme) => theme.spacing(3)
                                                }}
                                                src={require('../assets/img/busd.png')}
                                            />
                                            <Stack>
                                                <Typography
                                                    color="textSecondary"
                                                    sx={{
                                                        fontSize: (theme) => theme.spacing(1.75),
                                                        fontWeight: '500'
                                                    }}
                                                >
                                                    {(() => {
                                                        if (!balance.busd) {
                                                            return (
                                                                <Skeleton
                                                                    sx={{
                                                                        minWidth: (theme) => theme.spacing(10)
                                                                    }}
                                                                    animation="wave"
                                                                />
                                                            );
                                                        }
                                                        return `${formatNumber(
                                                            fromWei(balance.busd, tokens.busd.decimals)
                                                        )} BUSD`;
                                                    })()}
                                                </Typography>
                                                <Typography color="textSecondary" variant="caption">
                                                    {(() => {
                                                        if (!balance.busd || !tokenData.binancecoin) {
                                                            return (
                                                                <Skeleton
                                                                    sx={{
                                                                        minWidth: (theme) => theme.spacing(10)
                                                                    }}
                                                                    animation="wave"
                                                                />
                                                            );
                                                        }
                                                        return `≈ ${formatCurrency(
                                                            (fromWei(balance.busd, tokens.busd.decimals) *
                                                                tokenData.binancecoin.current_price) /
                                                                10000,
                                                            activeCurrency
                                                        )}`;
                                                    })()}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </>
                    )}
                    <Typography sx={{ p: 2 }}>Settings</Typography>
                    <Divider />
                    <CardContent component={Stack} spacing={2}>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Mode
                            </Typography>
                            <ToggleButtonGroup
                                fullWidth
                                color="primary"
                                value={isDark ? 'dark' : 'light'}
                                exclusive={true}
                                onChange={handleDarkMode}
                            >
                                <ToggleButton
                                    value="light"
                                    component={Button}
                                    startIcon={<LightModeRoundedIcon />}
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                >
                                    Light
                                </ToggleButton>
                                <ToggleButton
                                    value="dark"
                                    component={Button}
                                    startIcon={<DarkModeRoundedIcon />}
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                >
                                    Dark
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Currency
                            </Typography>
                            <Autocomplete
                                id="country-select-demo"
                                options={currencies}
                                autoHighlight
                                getOptionLabel={(option: any) => option.currency ?? ''}
                                value={currencies.find((item) => item.id === activeCurrency) ?? {}}
                                onChange={(event: any, newValue: any) => {
                                    if (newValue) {
                                        onChangeCurrency(newValue.id);
                                    }
                                }}
                                disabled={!currencies.length}
                                loading={!currencies.length}
                                renderOption={(props, option: any) => (
                                    <Box
                                        component="li"
                                        sx={{
                                            '& > img': { mr: 2, flexShrink: 0 }
                                        }}
                                        {...props}
                                    >
                                        {option.currency} ({option.id})
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'currency' // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            </Popover>
            <Drawer anchor="bottom" open={isOpenDrawer} onClose={toggleDrawer}>
                <Tabs
                    value={activeTab}
                    onChange={handleActiveTab}
                    orientation="vertical"
                    variant="fullWidth"
                    TabIndicatorProps={{
                        sx: {
                            bgcolor: (theme) => `${theme.palette.primary.main}15`,
                            borderColor: 'primary.main',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            width: '100%',
                            borderTop: 'none',
                            borderBottom: 'none',
                            height: '100%',
                            zIndex: 1
                        }
                    }}
                    sx={{
                        height: '100%',
                        '& .MuiTabs-flexContainer': {
                            position: 'relative',
                            zIndex: 2,
                            height: '100%',
                            '& button': {
                                py: 4
                            }
                        }
                    }}
                >
                    <Tab value="dashboard" label="Dashboard" />
                    <Tab value="page1" label="Page1" />
                    <Tab value="page2" label="Page2" />
                </Tabs>
            </Drawer>
        </AppBar>
    );
};

export default Header;
