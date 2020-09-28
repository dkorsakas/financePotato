import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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
}));

const GoodPastReport = () => {
    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let years = isItGoodPast.years;
    let operatingIncome = isItGoodPast.operatingIncome;

    // Capital Employed calculation
    let capitalEmployed = [];
    let capitalEmployedCalculation = [];
    let capitalEmployedCash = [];
    let capitalEmployedCashCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let capitalEmployedMinusCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i] -
            isItGoodPast.cashAndcashEquivalents[i];
        capitalEmployed.push(capitalEmployedMinusCash);
        let capitalEmployedMinusCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]} -
            ${isItGoodPast.cashAndcashEquivalents[i]}`;
        capitalEmployedCalculation.push(capitalEmployedMinusCashCalculation);
        let capitalEmployedWithCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i];
        capitalEmployedCash.push(capitalEmployedWithCash);
        let capitalEmployedWithCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]}`;
        capitalEmployedCashCalculation.push(capitalEmployedWithCashCalculation);
    }

    // Return on capital employed

    const roundNumber = (number) => {
        return Math.round(number * 100) / 100;
    };

    let rocePresent = [];
    let rocePast = [];
    let roceCashPresent = [];
    let roceCashPast = [];
    let roceAverage = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let rocePresentOne =
            Math.round((operatingIncome[i] / capitalEmployed[i]) * 10000) / 100;
        rocePresent.push(rocePresentOne);

        let roceCashPresentOne =
            Math.round((operatingIncome[i] / capitalEmployedCash[i]) * 10000) /
            100;
        roceCashPresent.push(roceCashPresentOne);

        if (capitalEmployed[i + 1] !== undefined) {
            let rocePastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployed[i + 1]) * 10000
                ) / 100;
            rocePast.push(rocePastOne);

            let roceCashPastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployedCash[i + 1]) * 10000
                ) / 100;
            roceCashPast.push(roceCashPastOne);

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
        } else {
            let rocePastOne = 'no data';
            rocePast.push(rocePastOne);

            let roceCashPastOne = 'no data';
            roceCashPast.push(roceCashPastOne);

            let roceAverageOne = (roceCashPresentOne + rocePresentOne) / 2;
            roceAverage.push(roceAverageOne);
        }
    }
    let historicalRoceAverage = 0;

    for (let i = 0; i < years.length; i++) {
        historicalRoceAverage = historicalRoceAverage + roceAverage[i];
    }

    historicalRoceAverage = roundNumber(historicalRoceAverage / years.length);

    //  return
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4'>Is it good (past performance)?</Typography>
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
                                    >{`Year ${years[index]} Capital Employed Minus Cash Year: ${bulletPoint}`}</Typography>
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
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} ROCE with Cash: ${roceCashPresent[index]}%`}</Typography>
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
                                primary={
                                    <Typography
                                        className={classes.boldItemStyle}
                                    >{`Year ${years[index]} Average ROCE 
                                    : ${roceAverage[index]}%`}</Typography>
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
                            >{`Historical average ROCE
                                    : ${historicalRoceAverage}%`}</Typography>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default GoodPastReport;
