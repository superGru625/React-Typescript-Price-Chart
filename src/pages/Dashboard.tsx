import { Container, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import axios from 'utils/axios';

const Dashboard = () => {
    const theme = useTheme();
    const [data, setData] = useState<any>([]);

    const formatter = (props) => {
        const date = new Date(props).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short'
        });
        return date;
    };
    useEffect(() => {
        axios
            .get('https://index-api.bitcoin.com/api/v0/history')
            .then(({ data: chartData }) => {
                setData(chartData.sort());
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Container
            sx={{
                height: 500,
                '& svg': {
                    overflow: 'visible'
                }
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis tickFormatter={formatter} dataKey="0" />
                    <YAxis />
                    <Area
                        type="monotone"
                        dataKey="1"
                        stroke={theme.palette.primary.main}
                        fillOpacity={1}
                        fill="url(#color)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default Dashboard;
