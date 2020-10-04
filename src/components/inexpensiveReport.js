import React from 'react';

import { useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

//import Divider from '@material-ui/core/Divider';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
    },
    spaceVertical: {
        marginTop: 40,
        marginBottom: 40,
    },
    left: {
        textAlign: 'left',
        marginTop: 30,
        fontWeight: 'bold',
    },
    boldItemStyle: {
        fontWeight: 'bold',
    },
    table: {
        minWidth: 650,
    },
    random: {
        backgroundColor: 'red',
    },
    red: {
        backgroundColor: 'red',
    },
    orange: {
        backgroundColor: 'orange',
    },
    green: {
        backgroundColor: '#C2F7B4',
    },

    veryGreen: {
        backgroundColor: '#80FF00',
    },
    nothing: {},
}));

const InexpensiveReport = () => {
    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let {
        cashAndCashEquivalents,

        years,
        operatingIncome,

        totalEquity,
        intangibleAssets,

        debt,
        preferredEquity,

        currentSharePrice,
        currentSharesOutstanding,
    } = isItGoodPast;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MarketCapitalization calcutalion
    let marketCap = [];

    for (let i = 0; i < years.length; i++) {
        marketCap.push(currentSharePrice[i] * currentSharesOutstanding[i]);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MarketCapitalization calcutalion
    let enterpriseValue = [];
    let enterpriseValueCash = [];

    for (let i = 0; i < years.length; i++) {
        enterpriseValue.push(marketCap[i] + debt[i] + preferredEquity[i]);
    }

    for (let i = 0; i < years.length; i++) {
        enterpriseValueCash.push(
            enterpriseValue[i] - cashAndCashEquivalents[i]
        );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inxepensiveness ratios
    let mcapFCF = [];
    let mcapBV = [];
    let mcapTBV = [];
    let evOI = [];
    let evCashOI = [];

    let tangibleBookValue = [];
    for (let i = 0; i < years.length; i++) {
        tangibleBookValue.push(totalEquity[i] - intangibleAssets[i]);
    }

    for (let i = 0; i < years.length; i++) {
        mcapFCF.push(
            marketCap[i] /
                (isItGoodPast.cashFlowFromOperations[i] -
                    isItGoodPast.maintainenceCapitalExpenditures[i])
        );
        mcapBV.push(marketCap[i] / totalEquity[i]);
        mcapTBV.push(marketCap[i] / tangibleBookValue[i]);

        evOI.push(enterpriseValue[i] / operatingIncome[i]);
        evCashOI.push(enterpriseValueCash[i] / operatingIncome[i]);
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //helper functions

    const makeNumberNice = (number, sign) => {
        let niceNumber = number.toLocaleString();
        if (sign) {
            niceNumber = niceNumber + sign;
        }
        return niceNumber;
    };

    // const roundNumber = (number) => {
    //     return Math.round(number * 100) / 100;
    // };

    const makeIntoRow = (name, metric, years) => {
        let rowData = { name };
        for (let i = 0; i < years.length; i++) {
            rowData[years[i]] = metric[i];

            rowData[`${years[i]}sign}`] = '';

            if (
                name.substring(0, 6) === 'MCAP/F' &&
                metric[i] <= 6 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'veryGreen';
            } else if (
                name.substring(0, 6) === 'MCAP/F' &&
                metric[i] <= 8 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'green';
            } else if (
                name.substring(0, 6) === 'MCAP/F' &&
                metric[i] <= 9 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'orange';
            } else if (name.substring(0, 6) === 'MCAP/F') {
                rowData[`${years[i]}color}`] = 'red';
            }

            if (
                name.substring(0, 2) === 'EV' &&
                metric[i] <= 5 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'veryGreen';
            } else if (
                name.substring(0, 2) === 'EV' &&
                metric[i] <= 7 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'green';
            } else if (
                name.substring(0, 2) === 'EV' &&
                metric[i] <= 8 &&
                metric[i] > 0
            ) {
                rowData[`${years[i]}color}`] = 'orange';
            } else if (name.substring(0, 2) === 'EV') {
                rowData[`${years[i]}color}`] = 'red';
            }

            if (
                name.substring(0, 6) === 'MCAP/B' ||
                (name.substring(0, 6) === 'MCAP/T' &&
                    metric[i] <= 2 &&
                    metric[i] > 0)
            ) {
                rowData[`${years[i]}color}`] = 'veryGreen';
            } else if (
                name.substring(0, 6) === 'MCAP/B' ||
                ((name.substring(0, 6) === 'MCAP/T') === 'EV/OI' &&
                    metric[i] <= 3 &&
                    metric[i] > 0)
            ) {
                rowData[`${years[i]}color}`] = 'green';
            } else if (
                name.substring(0, 6) === 'MCAP/B' ||
                (name.substring(0, 6) === 'MCAP/T' &&
                    metric[i] <= 3.5 &&
                    metric[i] > 0)
            ) {
                rowData[`${years[i]}color}`] = 'orange';
            } else if (
                name.substring(0, 6) === 'MCAP/B' ||
                name.substring(0, 6) === 'MCAP/T'
            ) {
                rowData[`${years[i]}color}`] = 'red';
            }

            // if (
            //     name.substring(0, 4) === 'Grow' &&
            //     metric[i] >= infilation[i] + 5
            // ) {
            //     rowData[`${years[i]}color}`] = 'veryGreen';
            // } else if (
            //     name.substring(0, 4) === 'Grow' &&
            //     metric[i] >= infilation[i]
            // ) {
            //     rowData[`${years[i]}color}`] = 'green';
            // } else if (
            //     name.substring(0, 4) === 'Grow' &&
            //     metric[i] >= infilation[i] - 1
            // ) {
            //     rowData[`${years[i]}color}`] = 'orange';
            // } else if (name.substring(0, 4) === 'Grow') {
            //     rowData[`${years[i]}color}`] = 'red';
            // }

            // if (name.substring(0, 4) === 'Liab' && metric[i] <= 200) {
            //     rowData[`${years[i]}color}`] = 'green';
            // } else if (name.substring(0, 4) === 'Liab' && metric[i] <= 300) {
            //     rowData[`${years[i]}color}`] = 'orange';
            // } else if (name.substring(0, 4) === 'Liab') {
            //     rowData[`${years[i]}color}`] = 'red';
            // }

            // if (name.substring(0, 4) === 'Debt' && metric[i] <= 400) {
            //     rowData[`${years[i]}color}`] = 'veryGreen';
            // } else if (name.substring(0, 4) === 'Debt' && metric[i] <= 500) {
            //     rowData[`${years[i]}color}`] = 'orange';
            // } else if (name.substring(0, 4) === 'Debt') {
            //     rowData[`${years[i]}color}`] = 'red';
            // }

            // if (name.substring(0, 4) === 'Inte' && metric[i] >= 5) {
            //     rowData[`${years[i]}color}`] = 'veryGreen';
            // } else if (name.substring(0, 4) === 'Inte' && metric[i] >= 4) {
            //     rowData[`${years[i]}color}`] = 'orange';
            // } else if (name.substring(0, 4) === 'Inte') {
            //     rowData[`${years[i]}color}`] = 'red';
            // }

            if (typeof metric[i] !== 'number' || isNaN(metric[i]) === true) {
                rowData[`${years[i]}color}`] = 'nothing';
            }
        }

        return rowData;
    };

    // creating rows for the metrics table
    const rows = [
        makeIntoRow('MCAP/FCF', mcapFCF, years),
        makeIntoRow('MCAP/BV', mcapBV, years),
        makeIntoRow('MCAP/TBV', mcapTBV, years),
        makeIntoRow('EV/OI', evOI, years),
        makeIntoRow('EV (minus cash) /OI', evCashOI, years),
    ];
    const rowsOther = [
        makeIntoRow('Market Capitalization', marketCap, years),
        makeIntoRow('Enterprise Value', enterpriseValue, years),
        makeIntoRow(
            'Enterprise Value (minus cash)',
            enterpriseValueCash,
            years
        ),
    ];

    //  return
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.spaceVertical}>
                <Typography variant='h4'>Is it inexpensive?</Typography>
            </div>
            <div className={classes.spaceVertical}>
                <Typography className={classes.left} variant='h6'>
                    Key metrics
                </Typography>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Metric</TableCell>
                            {years.map((bulletPoint, index) => (
                                <TableCell align='right'>
                                    {years[index]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                {years.map((bulletPoint, index) => (
                                    <TableCell
                                        className={
                                            classes[
                                                row[`${years[index]}color}`]
                                            ]
                                        }
                                        align='right'
                                    >
                                        {makeNumberNice(
                                            row[years[index]],
                                            row[`${years[index]}sign}`]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.spaceVertical}>
                <Typography className={classes.left} variant='h6'>
                    Other Metrics
                </Typography>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Metric</TableCell>
                            {years.map((bulletPoint, index) => (
                                <TableCell align='right'>
                                    {years[index]}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsOther.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                {years.map((bulletPoint, index) => (
                                    <TableCell align='right'>
                                        {makeNumberNice(
                                            row[years[index]],
                                            row[`${years[index]}sign}`]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default InexpensiveReport;
