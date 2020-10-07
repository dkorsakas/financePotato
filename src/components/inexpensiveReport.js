import React from 'react';

import { useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import {
    calculateRatios,
    makeIntoRow,
    makeNumberNice,
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

const InexpensiveReport = () => {
    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let {
        mcapBV,
        mcapFCF,
        mcapTBV,
        evOI,
        evCashOI,
        enterpriseValue,
        enterpriseValueCash,
        years,
        marketCap,
    } = calculateRatios(isItGoodPast);

    /////////////////////////////////////////////////////////////////////////////////////
    //helper functions

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
