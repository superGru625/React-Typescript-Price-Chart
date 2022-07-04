import { useCallback, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { styled } from '@mui/material/styles';
import { ToastProps } from './types';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const StyledToast = styled('div')(({ theme }) => ({
    position: 'fixed',
    right: 16,
    maxWidth: 'calc(100% - 32px)',
    transition: 'all 250ms ease-in',
    width: '100%',
    [theme.breakpoints.up('xs')]: {
        maxWidth: 400
    }
}));

const Toast: React.FC<ToastProps> = ({ toast, onRemove, style, ttl, ...props }) => {
    const timer = useRef<number>();
    const ref = useRef(null);
    const removeHandler = useRef(onRemove);
    const { id, title, description, type } = toast;

    const handleRemove = useCallback(() => removeHandler.current(id), [id, removeHandler]);

    const handleMouseEnter = () => {
        clearTimeout(timer.current);
    };

    const handleMouseLeave = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(() => {
            handleRemove();
        }, ttl);
    };

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = window.setTimeout(() => {
            handleRemove();
        }, ttl);

        return () => {
            clearTimeout(timer.current);
        };
    }, [timer, ttl, handleRemove]);

    return (
        <CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
            <StyledToast ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Alert
                    variant="filled"
                    severity={type}
                    onClick={handleRemove}
                    sx={{
                        '& .MuiAlert-icon': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }
                    }}
                >
                    {title && <AlertTitle sx={{ m: 0 }}>{title}</AlertTitle>}
                    {description}
                </Alert>
            </StyledToast>
        </CSSTransition>
    );
};

export default Toast;
