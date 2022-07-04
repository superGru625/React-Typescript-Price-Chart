import { styled } from '@mui/material/styles';
import useHttpLocations from 'hooks/useHttpLocations';
import Logo from './Logo';

const StyledListLogo = styled(Logo)(({ sizes }) => ({
    width: sizes,
    height: sizes
}));

export default function ListLogo({
    logoURI,
    style,
    size = '24px',
    alt
}: {
    logoURI: string;
    size?: string;
    style?: React.CSSProperties;
    alt?: string;
}) {
    const srcs: string[] = useHttpLocations(logoURI);

    return <StyledListLogo alt={alt} sizes={size} srcs={srcs} style={style} />;
}
