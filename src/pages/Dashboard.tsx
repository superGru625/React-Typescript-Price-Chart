import {
    Container,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
    Typography,
    useTheme,
    Grid,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';
import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { chartAction, newsAction } from 'state/dashboard/actions';

import axios from 'utils/axios';
import { corsRequest } from 'utils/corsRequest';

const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { data: cData, news } = useSelector((state: any) => state.dashboard);

    const [price, setPrice] = useState<any>();
    const [range, setRange] = useState<number>(30);

    const handleRangeChange = (event, newRange: number | null) => {
        if (newRange !== null) {
            setRange(newRange);
        }
    };
    const getDataByRange = (data: any) => {
        const origin = [...data];
        const timeForRange = range * 1000 * 60 * 60 * 24;
        const newData = origin.sort().map(([date, value]) => {
            const cTime = new Date().getTime();
            const time = new Date(date).getTime();
            const min = cTime - timeForRange;
            return time > min ? [date, value] : null;
        });
        return newData.filter((item) => item !== null);
    };
    const formatter = (props) => {
        const date = new Date(props).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short'
        });
        return date;
    };
    useEffect(() => {
        if (!news.length) {
            corsRequest(
                {
                    method: 'GET',
                    url: 'https://news.bitcoin.com/wp-content/weekly_popular_posts.json'
                },
                (result: any) => {
                    dispatch(newsAction(result ?? []));
                }
            );
        }
        if (!cData.length) {
            axios
                .get('https://index-api.bitcoin.com/api/v0/history')
                .then(({ data }) => {
                    dispatch(chartAction(data ?? []));
                })
                .catch((e) => {
                    console.log(e);
                });
        }
        axios
            .get('https://index-api.bitcoin.com/api/v0/cash/price/usd')
            .then(({ data: cp }) => {
                setPrice(cp.price ?? 0);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const chartData = useMemo(() => {
        if (!cData.length || !range) return;
        const updatedData = getDataByRange(cData);
        return updatedData;
    }, [cData.length, range]);

    return (
        <Container
            sx={{
                height: 500,
                '& svg': {
                    overflow: 'visible'
                }
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    pb: 5
                }}
            >
                <Typography variant="h6" sx={{ mb: 4 }}>
                    BCH Price: ${price ?? 'loading...'}
                </Typography>
                <ToggleButtonGroup value={range} exclusive onChange={handleRangeChange}>
                    <ToggleButton value={1}>24 hour</ToggleButton>
                    <ToggleButton value={7}>7 days</ToggleButton>
                    <ToggleButton value={30}>1 month</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <Grid container spacing={2} sx={{ pt: 15, pb: 10 }}>
                {news.map((item: any, idx: number) => {
                    return (
                        <Grid key={idx} item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia component="img" height="194" image={item.thumbnail} alt={`news-${idx}`} />
                                <CardContent>
                                    <Typography variant="body1">{item.title}</Typography>
                                    <Typography
                                        variant="overline"
                                        sx={{
                                            textAlign: 'right',
                                            mb: 2
                                        }}
                                    >
                                        {item.publish_date}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                                        This impressive paella is a perfect party dish and a fun meal to cook together
                                        with your guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default Dashboard;
