import Header from 'components/Header';
import Footer from 'components/Footer';

import Wrapper from './Wrapper';

import Stack from '@mui/material/Stack';

const MainLayout = () => (
    <Stack>
        <Header />
        <Wrapper />
        <Footer />
    </Stack>
);

export default MainLayout;
