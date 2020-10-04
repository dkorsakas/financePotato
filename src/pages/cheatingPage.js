import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setGoodPastMetricYears,
    setGoodPastMetric,
} from '../redux/actions/valueActions';
// const https = require('https');

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
    textGoesLeft: {
        textAlign: 'left',

        marginTop: 20,
        marginBottom: 20,
    },
}));

const CheatingPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let apiKey = '';
    let symbol = '';

    const [loading, setLoading] = useState('.');

    const parseNumber = (number) => {
        if (number === undefined) {
            return 0;
        } else if (
            typeof parseInt(number) !== 'number' ||
            isNaN(parseInt(number)) === true
        ) {
            return 0;
        } else {
            return parseInt(number);
        }
    };

    const getStockData = async () => {
        setLoading('loading');
        const incomeStatement = await fetch(
            `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${apiKey}`
        ).then((res) => res.json());

        const balanceSheet = await fetch(
            `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=${apiKey}`
        ).then((res) => res.json());

        const cashFlow = await fetch(
            `https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${apiKey}`
        ).then((res) => res.json());

        const overview = await fetch(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
        ).then((res) => res.json());

        //years

        console.log(overview);

        if (
            overview.SharesOutstanding !== undefined &&
            incomeStatement.annualReports !== undefined &&
            balanceSheet.annualReports !== undefined &&
            cashFlow.annualReports !== undefined
        ) {
            let years = [];

            for (let i = 0; i < incomeStatement.annualReports.length; i++) {
                years.push(
                    parseNumber(
                        incomeStatement.annualReports[
                            i
                        ].fiscalDateEnding.substring(0, 4)
                    )
                );
            }

            dispatch(
                setGoodPastMetricYears({
                    goodPastYears: [...years],
                    goodPastTypeYears: 'years',
                })
            );

            //operating income

            let operatingIncome = [];

            for (let i = 0; i < years.length; i++) {
                operatingIncome.push(
                    parseNumber(
                        incomeStatement.annualReports[i].operatingIncome
                    )
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: operatingIncome,
                    goodPastType: 'operatingIncome',
                })
            );

            //interest expense

            let interestExpense = [];

            for (let i = 0; i < years.length; i++) {
                interestExpense.push(
                    parseNumber(
                        incomeStatement.annualReports[i].interestExpense
                    )
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: interestExpense,
                    goodPastType: 'interestExpense',
                })
            );

            //debt

            let debt = [];

            for (let i = 0; i < years.length; i++) {
                debt.push(
                    parseNumber(balanceSheet.annualReports[i].shortTermDebt) +
                        parseNumber(
                            balanceSheet.annualReports[i].totalLongTermDebt
                        )
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: debt,
                    goodPastType: 'debt',
                })
            );

            //total assets

            let totalAssets = [];

            for (let i = 0; i < years.length; i++) {
                totalAssets.push(
                    parseNumber(balanceSheet.annualReports[i].totalAssets)
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: totalAssets,
                    goodPastType: 'totalAssets',
                })
            );

            // total intangible assets

            let intangibleAssets = [];

            for (let i = 0; i < years.length; i++) {
                intangibleAssets.push(
                    parseNumber(
                        balanceSheet.annualReports[i].intangibleAssets
                    ) + parseNumber(balanceSheet.annualReports[i].goodwill)
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: intangibleAssets,
                    goodPastType: 'intangibleAssets',
                })
            );

            // total intangible assets

            let totalLiabilities = [];

            for (let i = 0; i < years.length; i++) {
                totalLiabilities.push(
                    parseNumber(balanceSheet.annualReports[i].totalLiabilities)
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: totalLiabilities,
                    goodPastType: 'totalLiabilities',
                })
            );

            // total intangible assets

            let totalEquity = [];

            for (let i = 0; i < years.length; i++) {
                totalEquity.push(totalAssets[i] - totalLiabilities[i]);
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: totalEquity,
                    goodPastType: 'totalEquity',
                })
            );

            //cash and cash equivalents

            let cash = [];

            for (let i = 0; i < years.length; i++) {
                cash.push(parseNumber(balanceSheet.annualReports[i].cash));
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: cash,
                    goodPastType: 'cashAndCashEquivalents',
                })
            );

            //cash and cash equivalents

            let nonInterestBearingCurrentLiabilities = [];

            for (let i = 0; i < years.length; i++) {
                nonInterestBearingCurrentLiabilities.push(
                    parseNumber(
                        balanceSheet.annualReports[i].otherCurrentLiabilities
                    ) +
                        parseNumber(
                            balanceSheet.annualReports[i].accountsPayable
                        )
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: nonInterestBearingCurrentLiabilities,
                    goodPastType: 'nonInterestBearingCurrentLiabilities',
                })
            );

            //cash flow from operations

            let cashFlowFromOperations = [];

            for (let i = 0; i < years.length; i++) {
                cashFlowFromOperations.push(
                    parseNumber(cashFlow.annualReports[i].operatingCashflow)
                    //  +
                    //     parseNumber(
                    //         cashFlow.annualReports[i].otherOperatingCashflow
                    //     )
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: cashFlowFromOperations,
                    goodPastType: 'cashFlowFromOperations',
                })
            );

            //maintainence capex

            let maintainenceCapitalExpenditures = [];

            for (let i = 0; i < years.length; i++) {
                maintainenceCapitalExpenditures.push(
                    parseNumber(cashFlow.annualReports[i].capitalExpenditures)
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: maintainenceCapitalExpenditures,
                    goodPastType: 'maintainenceCapitalExpenditures',
                })
            );

            //shares

            let shares = [];

            for (let i = 0; i < years.length; i++) {
                shares.push(parseNumber(overview.SharesOutstanding));
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: shares,
                    goodPastType: 'currentSharesOutstanding',
                })
            );
            dispatch(
                setGoodPastMetric({
                    goodPastMetric: shares,
                    goodPastType: 'numberOfSharesDiluted',
                })
            );

            //share price

            let currentSharePrice = [];

            for (let i = 0; i < years.length; i++) {
                currentSharePrice.push(
                    parseNumber(overview['50DayMovingAverage'])
                );
            }

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: currentSharePrice,
                    goodPastType: 'currentSharePrice',
                })
            );

            //preferred equity

            let preferredEquity = [];

            for (let i = 0; i < years.length; i++) {
                preferredEquity.push(
                    parseNumber(
                        balanceSheet.annualReports[i].preferredStockTotalEquity
                    )
                );
            }

            console.log(preferredEquity);

            dispatch(
                setGoodPastMetric({
                    goodPastMetric: preferredEquity,
                    goodPastType: 'preferredEquity',
                })
            );

            setLoading('done');
        } else {
            setLoading(
                `could not get this stock :( try again: ${overview['Error Message']}`
            );
        }
    };

    const handleChange = (event) => {
        if (event.target.id === 'symbol') {
            symbol = event.target.value;
        } else if (event.target.id === 'api') {
            apiKey = event.target.value;
        }
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Typography
                        className={(classes.root, classes.boldText)}
                        variant='h4'
                    >
                        Are you lazy?
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        If yes you have come to the right page - just enter your
                        cheatcodes and hope that they work - if they dont work,
                        then,sadly, you will be the one who will have to do the
                        work :)
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        Generally all stocks listed on nasdaq and nyse should
                        work; also make sure to write the ticker name in capital
                        letters; e.g. AAPL
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        Wtf is api key? well its like a password that lets you
                        access stock data; you can get your api key by going to:{' '}
                        <href to='https://www.alphavantage.co/'></href>
                        and registering;
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        Also the numbers that are fetched using this method are
                        not the most accurate beacause some data cannot be
                        accessed (e.g. shares outstanding are available only for
                        the last year) - you should treat the numbers as an
                        approximation;
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        To see how this works and have a demo run - just use:
                        symbol: IBM apiKey: demo
                    </Typography>
                    <Typography className={classes.textGoesLeft}>
                        Lastly for some sort of reason it is a bit buggy;
                        sometimes it works sometimes you need to make a like a 1
                        minute pause and try again. AAPL should defintely work.
                    </Typography>
                    <TextField
                        id='symbol'
                        margin='normal'
                        rows={3}
                        placeholder='Enter stock symbol'
                        variant='outlined'
                        onChange={handleChange}
                        fullWidth={true}
                    />
                    <TextField
                        id='api'
                        margin='normal'
                        rows={3}
                        placeholder='Enter your API key'
                        variant='outlined'
                        onChange={handleChange}
                        fullWidth={true}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={getStockData}
                        className={classes.root}
                    >
                        get data
                    </Button>
                    <Typography>{loading}</Typography>
                    <div></div>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default CheatingPage;
