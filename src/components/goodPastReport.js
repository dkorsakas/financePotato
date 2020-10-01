import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        margin: 20,
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
}));

const GoodPastReport = () => {
    const pushSafe = (input, array) => {
        if (input !== undefined) {
            array.push(input);
        } else {
            array.push('no data');
        }
    };

    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let years = isItGoodPast.years;
    let operatingIncome = isItGoodPast.operatingIncome;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Capital Employed calculation
    let capitalEmployed = [];
    let capitalEmployedCalculation = [];
    let capitalEmployedCash = [];
    let capitalEmployedCashCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let capitalEmployedMinusCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i] -
            isItGoodPast.cashAndCashEquivalents[i];
        pushSafe(capitalEmployedMinusCash, capitalEmployed);
        let capitalEmployedMinusCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]} -
            ${isItGoodPast.cashAndCashEquivalents[i]}`;
        pushSafe(
            capitalEmployedMinusCashCalculation,
            capitalEmployedCalculation
        );
        let capitalEmployedWithCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i];
        pushSafe(capitalEmployedWithCash, capitalEmployedCash);
        let capitalEmployedWithCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]}`;
        pushSafe(
            capitalEmployedWithCashCalculation,
            capitalEmployedCashCalculation
        );
    }

    // {name: capital employed, }

    const makeIntoRow = (name, metric, years) => {
        let rowData = { name };
        for (let i = 0; i < years.length; i++) {
            rowData[years[i]] = metric[i];
        }
        return rowData;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Return on capital employed

    const roundNumber = (number) => {
        return Math.round(number * 100) / 100;
    };

    let rocePresent = [];
    let rocePast = [];
    let roceCashPresent = [];
    let roceCashPast = [];
    let roceAverage = [];

    let rocePresentCalculation = [];
    let rocePastCalculation = [];
    let roceCashPresentCalculation = [];
    let roceCashPastCalculation = [];
    let roceAverageCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let rocePresentOne =
            Math.round((operatingIncome[i] / capitalEmployed[i]) * 10000) / 100;
        rocePresent.push(rocePresentOne);
        rocePresentCalculation.push(
            `(${operatingIncome[i]} / ${capitalEmployed[i]}) * 100`
        );

        let roceCashPresentOne =
            Math.round((operatingIncome[i] / capitalEmployedCash[i]) * 10000) /
            100;
        roceCashPresent.push(roceCashPresentOne);
        roceCashPresentCalculation.push(
            `(${operatingIncome[i]} / ${capitalEmployedCash[i]}) * 100`
        );

        if (capitalEmployed[i + 1] !== undefined) {
            let rocePastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployed[i + 1]) * 10000
                ) / 100;
            rocePast.push(rocePastOne);
            rocePastCalculation.push(
                `(${operatingIncome[i]} / ${capitalEmployed[i + 1]}) * 100`
            );

            let roceCashPastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployedCash[i + 1]) * 10000
                ) / 100;
            roceCashPast.push(roceCashPastOne);
            roceCashPastCalculation.push(
                `(${operatingIncome[i]} / ${capitalEmployedCash[i + 1]}) * 100`
            );

            let roceAverageOne =
                Math.round(
                    ((roceCashPresentOne +
                        roceCashPastOne +
                        rocePresentOne +
                        rocePastOne) *
                        100) /
                        4
                ) / 100;
            roceAverage.push(roceAverageOne);
            roceAverageCalculation.push(
                `(${roceCashPresentOne} + ${roceCashPastOne} + ${rocePresentOne} + ${rocePastOne}) / 4`
            );
        } else {
            let rocePastOne = 'no data';
            rocePast.push(rocePastOne);

            let roceCashPastOne = 'no data';
            roceCashPast.push(roceCashPastOne);

            let roceAverageOne = (roceCashPresentOne + rocePresentOne) / 2;
            roceAverage.push(roceAverageOne);
            roceAverageCalculation.push(
                `(${roceCashPresentOne} + ${rocePresentOne} ) / 2`
            );
        }
    }
    let historicalRoceAverage = 0;
    let historicalRoceAverageCalculation = '';

    for (let i = 0; i < years.length; i++) {
        historicalRoceAverage = historicalRoceAverage + roceAverage[i];
        historicalRoceAverageCalculation =
            historicalRoceAverageCalculation + `(${historicalRoceAverage} +`;
    }

    historicalRoceAverageCalculation =
        historicalRoceAverageCalculation.slice(0, -1) + `) / ${years.length}`;

    historicalRoceAverage = roundNumber(historicalRoceAverage / years.length);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Free Cash Flow Return On capital Employed

    let freeCashFlow = [];
    let freeRocePresent = [];
    let freeRocePast = [];
    let freeRoceCashPresent = [];
    let freeRoceCashPast = [];
    let freeRoceAverage = [];

    const rows = [
        makeIntoRow('Capital Employed (With Cash)', capitalEmployed, years),
        makeIntoRow(
            'Capital Employed (Minus Cash)',
            capitalEmployedCash,
            years
        ),
        makeIntoRow('ROCE', rocePresent, years),
        makeIntoRow("ROCE (last year's capital employed)", rocePast, years),
        makeIntoRow('ROCE (minus Cash)', roceCashPresent, years),
        makeIntoRow(
            "ROCE (minus cash & last year's capital employed)",
            roceCashPast,
            years
        ),
    ];

    let freeCashFlowCalculation = [];
    let freeRocePresentCalculation = [];
    let freeRocePastCalculation = [];
    let freeRoceCashPresentCalculation = [];
    let freeRoceCashPastCalculation = [];
    let freeRoceAverageCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let freeCashFlowOne = roundNumber(
            isItGoodPast.cashFlowFromOperations[i] -
                isItGoodPast.maintainenceCapitalExpenditures[i]
        );
        freeCashFlow.push(freeCashFlowOne);

        let freeRocePresentOne =
            Math.round((freeCashFlowOne / capitalEmployed[i]) * 10000) / 100;
        freeRocePresent.push(freeRocePresentOne);

        let freeRoceCashPresentOne =
            Math.round((freeCashFlowOne / capitalEmployedCash[i]) * 10000) /
            100;
        freeRoceCashPresent.push(freeRoceCashPresentOne);

        if (capitalEmployed[i + 1] !== undefined) {
            let freeRocePastOne =
                Math.round((freeCashFlowOne / capitalEmployed[i + 1]) * 10000) /
                100;
            freeRocePast.push(freeRocePastOne);

            let freeRoceCashPastOne =
                Math.round(
                    (freeCashFlowOne / capitalEmployedCash[i + 1]) * 10000
                ) / 100;
            freeRoceCashPast.push(freeRoceCashPastOne);

            let freeRoceAverageOne =
                Math.round(
                    ((freeRoceCashPresentOne +
                        freeRoceCashPastOne +
                        freeRocePresentOne +
                        freeRocePastOne) *
                        100) /
                        4
                ) / 100;
            freeRoceAverage.push(freeRoceAverageOne);
        } else {
            let freeRocePastOne = 'no data';
            freeRocePast.push(freeRocePastOne);

            let freeRoceCashPastOne = 'no data';
            freeRoceCashPast.push(freeRoceCashPastOne);

            let freeRoceAverageOne =
                (freeRoceCashPresentOne + freeRocePresentOne) / 2;
            freeRoceAverage.push(freeRoceAverageOne);
        }
    }
    let historicalFreeRoceAverage = 0;

    for (let i = 0; i < years.length; i++) {
        historicalFreeRoceAverage =
            historicalFreeRoceAverage + freeRoceAverage[i];
    }

    historicalFreeRoceAverage = roundNumber(
        historicalFreeRoceAverage / years.length
    );

    //  return
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4'>Is it good (past performance)?</Typography>
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
                                    <TableCell align='right'>
                                        {row[years[index]]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography className={classes.left} variant='h6'>
                Capital Employed
            </Typography>
            <List className={classes.list}>
                {capitalEmployed.map((bulletPoint, index) => (
                    <div>
                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} Capital Employed Minus Cash: ${bulletPoint}`}</Typography>
                                }
                            />
                        </ListItem>
                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${capitalEmployedCalculation[index]}`}
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} Capital Employed With Cash: ${capitalEmployedCash[index]}`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${capitalEmployedCashCalculation[index]}`}
                            />
                        </ListItem>
                    </div>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Return on Capital Employed
            </Typography>
            <List className={classes.list}>
                {years.map((bulletPoint, index) => (
                    <div>
                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} ROCE (minus cash): ${rocePresent[index]}%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${rocePresentCalculation[index]}`}
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} ROCE with Cash: ${roceCashPresent[index]}%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${roceCashPresentCalculation[index]}`}
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${
                                        years[index]
                                    } ROCE (minus cash & using ${
                                        years[index] - 1
                                    } capital employed): ${
                                        rocePast[index]
                                    }%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${rocePastCalculation[index]}`}
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} ROCE (using ${
                                        years[index] - 1
                                    } capital employed): ${
                                        roceCashPast[index]
                                    }%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${roceCashPastCalculation[index]}`}
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} Average ROCE 
                                : ${roceAverage[index]}%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={`Calculation: ${roceAverageCalculation[index]}`}
                            />
                        </ListItem>
                    </div>
                ))}
                <ListItem divider key={uuidv4()}>
                    <ListItemText
                        primary={
                            <Typography
                                className={classes.boldItemStyle}
                            >{`Historical average ROCE
                                : ${historicalRoceAverage}%`}</Typography>
                        }
                    />
                </ListItem>

                <ListItem divider key={uuidv4()}>
                    <ListItemText
                        primary={`Calculation: ${historicalRoceAverageCalculation}`}
                    />
                </ListItem>
            </List>

            <Typography className={classes.left} variant='h6'>
                Free Cash Flow Return on Capital Employed
            </Typography>
            <List className={classes.list}>
                {years.map((bulletPoint, index) => (
                    <div>
                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} FCFROCE (minus cash): ${freeRocePresent[index]}%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} FCFROCE with Cash: ${freeRoceCashPresent[index]}%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${
                                        years[index]
                                    } FCFROCE (minus cash & using ${
                                        years[index] - 1
                                    } capital employed): ${
                                        freeRocePast[index]
                                    }%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} FCFROCE (using ${
                                        years[index] - 1
                                    } capital employed): ${
                                        freeRoceCashPast[index]
                                    }%`}</Typography>
                                }
                            />
                        </ListItem>

                        <ListItem divider key={uuidv4()}>
                            <ListItemText
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} Average FCFROCE 
                            : ${freeRoceAverage[index]}%`}</Typography>
                                }
                            />
                        </ListItem>
                    </div>
                ))}
                <ListItem divider key={uuidv4()}>
                    <ListItemText
                        primary={
                            <Typography
                                className={classes.boldItemStyle}
                            >{`Historical average FCFROCE
                            : ${historicalFreeRoceAverage}%`}</Typography>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default GoodPastReport;
