import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <AppBar
            position="static"
            component="footer"
            color="primary"
            sx={{
                marginLeft: 0,
                transition: '.5s',
                width: '100%',
                padding: 0,
                boxShadow: '0px 0px 12px 2px rgb(0 0 0 / 30%)',
                bgcolor: (theme) => `${theme.palette.background.default}99`
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'center',
                    minHeight: '48px !important'
                }}
            >
                <Typography fontSize={14} color="textSecondary">
                    Powered By ...
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
