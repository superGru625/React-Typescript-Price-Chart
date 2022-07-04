import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '../assets/css/index.css';
import useConfig from 'hooks/useConfig';

import { dark, light } from 'config/constants/theme';

type MuiThemeProviderProps = {
    children: React.ReactNode;
};

// ** Declare Theme Provider
const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => {
    const { isDark } = useConfig();

    const theme = createTheme(isDark ? dark : light);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;
