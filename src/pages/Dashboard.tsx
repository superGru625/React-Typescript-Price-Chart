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
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import axios from 'utils/axios';

const Dashboard = () => {
    const theme = useTheme();

    const [origin, setOrigin] = useState<any>([]);
    const [price, setPrice] = useState<any>();
    const [news, setNews] = useState<any>([]);
    const [range, setRange] = useState<number>(30);

    const handleRangeChange = (event, newRange: number | null) => {
        if (newRange !== null) {
            setRange(newRange);
        }
    };
    const getDataByRange = (chartData: any) => {
        const timeForRange = range * 1000 * 60 * 60 * 24;
        const newData = chartData.sort().map(([date, value]) => {
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
        axios
            .get('https://index-api.bitcoin.com/api/v0/cash/price/usd')
            .then(({ data: cp }) => {
                setPrice(cp.price ?? 0);
            })
            .catch((e) => {
                console.log(e);
            });
        axios
            .get('https://index-api.bitcoin.com/api/v0/history')
            .then(({ data: chartData }) => {
                setOrigin(chartData);
            })
            .catch((e) => {
                console.log(e);
            });
        axios
            .get('https://news.bitcoin.com/wp-content/weekly_popular_posts.json')
            .then(({ data }) => {
                console.log(data);
            })
            .catch((e) => {
                const fakeNews = [
                    {
                        title: "Onecoin's Co-Founder Ruja Ignatova Has Been Added to the FBI's 10 Most Wanted Fugitives List",
                        publish_date: '2022-06-30 21:30:13',
                        thumbnail: 'https://static.news.bitcoin.com/wp-content/uploads/2022/06/xxcvdssd.jpg',
                        excerpt:
                            'One of the Onecoin co-founders, Ruja Ignatova, otherwise known as the ‘Cryptoqueen,’ has been added to the Federal Bureau of Investigation’s (FBI) Ten Most Wanted Fugitives list on Thursday. In addition to adding the Cryptoqueen to the most wanted list, the FBI is offering a reward of up to $100K for tips that lead to',
                        href: 'https://news.bitcoin.com/onecoins-co-founder-ruja-ignatova-has-been-added-to-the-fbis-10-most-wanted-fugitives-list/?utm_source=BitcoincomWallet&utm_medium=Discovery&utm_campaign=News'
                    },
                    {
                        title: "Terra's Crypto Tokens UST and Luna Classic Mysteriously Pumped This Week, UST Climbed by 470%",
                        publish_date: '2022-07-01 05:30:41',
                        thumbnail:
                            'https://static.news.bitcoin.com/wp-content/uploads/2022/07/shutterstock_2075714329.jpg',
                        excerpt:
                            'After the downfall of the two most popular crypto assets on the Terra blockchain, the digital currencies terrausd (UST) and luna classic (LUNC) increased a great deal in value against the U.S. dollar in recent times. During the last seven days, LUNC has risen 96.3% and the once-stable coin UST has increased 472.4% this week.',
                        href: 'https://news.bitcoin.com/terras-crypto-tokens-ust-and-luna-classic-mysteriously-pumped-this-week-ust-climbed-by-470/?utm_source=BitcoincomWallet&utm_medium=Discovery&utm_campaign=News'
                    },
                    {
                        title: "Vladimir Putin Says West's Attempt to 'Crush the Russian Economy' Did Not Succeed",
                        publish_date: '2022-07-01 19:30:37',
                        thumbnail: 'https://static.news.bitcoin.com/wp-content/uploads/2022/07/ddccvvvx.jpg',
                        excerpt:
                            'Last week the Russian ruble hit a seven-year high against the U.S. dollar and while analysts have downplayed the rise, one economist said people should not “ignore the exchange rate.” American economists have been perplexed about the ruble’s market performance and Russian officials have been quoted as saying that a strong ruble “makes Russian exports',
                        href: 'https://news.bitcoin.com/vladimir-putin-says-wests-attempt-to-crush-the-russian-economy-did-not-succeed/?utm_source=BitcoincomWallet&utm_medium=Discovery&utm_campaign=News'
                    },
                    {
                        title: "Deutsche Bank Predicts Bitcoin Rising to $28K by Year-End — Warns 'Crypto Free Fall Could Continue'",
                        publish_date: '2022-07-01 01:30:16',
                        thumbnail: 'https://static.news.bitcoin.com/wp-content/uploads/2022/06/db.jpg',
                        excerpt:
                            'Deutsche Bank has predicted that the price of bitcoin will increase nearly 40% from the current level to $28K by the end of the year. The bank’s analysts also warned that “the crypto free fall could continue.” Deutsche Bank’s Bitcoin Price Prediction Deutsche Bank has reportedly predicted that the price of bitcoin will rise to',
                        href: 'https://news.bitcoin.com/deutsche-bank-predicts-bitcoin-rising-to-28k-by-year-end-warns-crypto-free-fall-could-continue/?utm_source=BitcoincomWallet&utm_medium=Discovery&utm_campaign=News'
                    },
                    {
                        title: "El Salvador Buys 80 More Bitcoin as BTC Fell Below $19K — President Insists 'Bitcoin Is the Future'",
                        publish_date: '2022-07-01 13:30:47',
                        thumbnail: 'https://static.news.bitcoin.com/wp-content/uploads/2022/07/el-salvador-80-btc.jpg',
                        excerpt:
                            'El Salvador has doubled down on its bitcoin commitment despite a heavy sell-off in the crypto market. The country has bought 80 more bitcoins, according to Salvadoran President Nayib Bukele. El Salvador Bought the Bitcoin Dip The president of El Salvador, Nayib Bukele, announced Thursday that his country has bought 80 more bitcoins. At the',
                        href: 'https://news.bitcoin.com/el-salvador-buys-80-more-bitcoin-as-btc-fell-below-19k-president-insists-bitcoin-is-the-future/?utm_source=BitcoincomWallet&utm_medium=Discovery&utm_campaign=News'
                    }
                ];
                setNews(fakeNews);
            });
    }, []);

    const chartData = useMemo(() => {
        if (!origin || !range) return;
        const updatedData = getDataByRange(origin);
        return updatedData;
    }, [origin, range]);

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
