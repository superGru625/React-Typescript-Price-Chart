import { ThemeOptions } from '@mui/material';

export const light: ThemeOptions = {
    palette: {
        mode: 'light'
    },
    typography: {
        fontFamily: "'Poppins', cursive",
        fontSize: 14
    },
    shape: {
        borderRadius: 6
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(5px)'
                }
            }
        }
    }
};

export const dark: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#3b82f6'
        },
        background: {
            paper: '#131419',
            default: '#1a1b20'
        }
    },
    typography: {
        fontFamily: "'Poppins', cursive",
        fontSize: 14
    },
    shape: {
        borderRadius: 6
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 6
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backdropFilter: 'blur(5px)'
                }
            }
        }
    }
};
