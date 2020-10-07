import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { calculateRatios } from '../util/calculateRatios';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
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

const GoodPastCalculations = () => {
    let isItGoodPast = useSelector((state) => state.isItGoodPast);

    let {
        capitalEmployed,
        years,
        capitalEmployedCalculation,
        capitalEmployedCash,
        capitalEmployedCashCalculation,
        rocePresent,
        rocePresentCalculation,
        roceCashPresent,
        roceCashPresentCalculation,
        rocePastCalculation,
        roceCashPastCalculation,
        roceAverage,
        roceAverageCalculation,
        historicalRoceAverage,
        historicalRoceAverageCalculation,
        freeRocePresent,
        freeRoceCashPresent,
        freeRoceCashPast,
        freeRoceAverage,
        historicalFreeRoceAverage,
        roceCashPast,
        freeRocePast,
        rocePast,
    } = calculateRatios(isItGoodPast);

    //  return
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4' classNmae={classes.root}>
                Calculations
            </Typography>
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

export default GoodPastCalculations;
