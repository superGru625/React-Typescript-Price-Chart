import { Suspense, LazyExoticComponent, ComponentType } from 'react';

// material-ui
import { LinearProgressProps } from '@mui/material/LinearProgress';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps {}

const Loadable =
    (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode> | any) =>
    (props: LoaderProps) =>
        (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );

export default Loadable;
