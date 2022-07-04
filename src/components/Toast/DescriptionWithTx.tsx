import { getBscScanLink } from 'utils';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import truncateHash from 'utils/truncateHash';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface DescriptionWithTxProps {
    description?: string;
    txHash?: string;
    children?: React.ReactNode;
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {
    const { chainId } = useActiveWeb3React();
    return (
        <>
            {typeof children === 'string' ? <Typography component="p">{children}</Typography> : children}
            {txHash && (
                <Link color="inherit" target="_blank" href={getBscScanLink(txHash, 'transaction', chainId)}>
                    View on BscScan: {truncateHash(txHash, 8, 0)}
                </Link>
            )}
        </>
    );
};

export default DescriptionWithTx;
