import React from 'react';

import { useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    makeNumberNice,
    makeIntoRowGoodPast,
    calculateRatios,
} from '../util/calculateRatios';

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

const GoodPastReport = () => {
    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let {
        years,
        infilation,
        rocePresent,
        rocePast,
        roceCashPresent,
        roceCashPast,
        freeRocePresent,
        freeRoceCashPast,
        freeRoceCashPresent,
        freeCashFlow,
        capitalEmployedCash,
        totalAssets,
        totalEquity,
        debt,
        freeRocePast,
        growthShareOI,
        growthShareFCF,
        growthShareBookValue,
        growthShareTangibleBookValue,
        liabilitiesToEquityRatio,
        debtToEquityRatio,
        interestCoverageRatio,
        operatingIncome,
        interestExpense,
        cashFlowFromOperations,
        maintainenceCapitalExpenditures,
        cashAndCashEquivalents,
        nonInterestBearingCurrentLiabilities,
        tangibleBookValue,
        totalLiabilities,
        numberOfSharesDiluted,
    } = calculateRatios(isItGoodPast);

    // creating rows for the metrics table
    const rows = [
        makeIntoRowGoodPast('ROCE', rocePresent, years, infilation),
        makeIntoRowGoodPast(
            "ROCE (last year's capital employed)",
            rocePast,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'ROCE (minus Cash)',
            roceCashPresent,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            "ROCE (minus cash & last year's capital employed)",
            roceCashPast,
            years,
            infilation
        ),
        makeIntoRowGoodPast('FCFROCE', freeRocePresent, years, infilation),
        makeIntoRowGoodPast(
            "FCFROCE (last year's capital employed)",
            freeRocePast,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'FCFROCE (minus Cash)',
            freeRoceCashPresent,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            "FCFROCE (minus cash & last year's capital employed)",
            freeRoceCashPast,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Growth in Operating Income per Share',
            growthShareOI,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Growth in FCF per Share',
            growthShareFCF,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Growth in Book Value per Share',
            growthShareBookValue,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Growth in Tangible Book Value per Share',
            growthShareTangibleBookValue,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Liabilities to Equity Ratio',
            liabilitiesToEquityRatio,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Debt to Equity Ratio',
            debtToEquityRatio,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Interest Coverage Ratio',
            interestCoverageRatio,
            years,
            infilation
        ),
    ];

    const rowsOther = [
        makeIntoRowGoodPast(
            'Operating Income',
            operatingIncome,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Interest Expense',
            interestExpense,
            years,
            infilation
        ),
        makeIntoRowGoodPast('FCF', freeCashFlow, years, infilation),
        makeIntoRowGoodPast(
            'Cash Flow From Operations',
            cashFlowFromOperations,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Maintainence CAPEX',
            maintainenceCapitalExpenditures,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Cash and Cash Equivalents',
            cashAndCashEquivalents,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Cash and Cash Equivalents',
            cashAndCashEquivalents,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Non interest bearing current liabilities',
            nonInterestBearingCurrentLiabilities,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Capital Employed (Minus Cash)',
            capitalEmployedCash,
            years,
            infilation
        ),
        makeIntoRowGoodPast('Total Assets', totalAssets, years, infilation),
        makeIntoRowGoodPast(
            'Tangible Book Value',
            tangibleBookValue,
            years,
            infilation
        ),
        makeIntoRowGoodPast('Total Equity', totalEquity, years, infilation),
        makeIntoRowGoodPast('Debt', debt, years, infilation),
        makeIntoRowGoodPast(
            'Total Liabilities',
            totalLiabilities,
            years,
            infilation
        ),
        makeIntoRowGoodPast(
            'Fully diluted shares',
            numberOfSharesDiluted,
            years,
            infilation
        ),
        makeIntoRowGoodPast('Infilation', infilation, years, infilation),
    ];

    //  return
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.spaceVertical}>
                <Typography variant='h4'>
                    Is it good (past performance)?
                </Typography>
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

export default GoodPastReport;
