import React from 'react';
import {
    setGoodPastMetric,
    setGoodPastMetricYears,
} from '../redux/actions/valueActions';
import { useDispatch, useSelector } from 'react-redux';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    textGoesLeftBold: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    textGoesLeft: {
        textAlign: 'left',
    },
}));
const GoodPastField = ({ goodPastType, notesType }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    let goodPastMetricRedux = useSelector(
        (state) => state.isItGoodPast[goodPastType]
    );
    let goodPastMetricNotesRedux = useSelector(
        (state) => state.isItGoodPast[notesType]
    );
    const goodPastTypeYears = `${goodPastType}Years`;

    let goodPastYearsRedux = useSelector(
        (state) => state.isItGoodPast[goodPastTypeYears]
    );

    let baseYearRedux = useSelector((state) => state.isItGoodPast.baseYear);

    let goodPastYears = goodPastYearsRedux;

    if (goodPastYears.length <= 0) {
        goodPastYears = [baseYearRedux];
    }

    const handleChange = (event) => {
        goodPastMetricRedux = parseInt(event.target.value);
        console.log(typeof goodPastMetricRedux);
        dispatch(setGoodPastMetric({ goodPastMetricRedux, goodPastType }));
    };

    const addOneMoreYear = () => {
        console.log(goodPastYears);
        console.log(goodPastYears[goodPastYears.length - 1] - 1);
        goodPastYears.push(goodPastYears[goodPastYears.length - 1] - 1);
        console.log('clicked');
        console.log(goodPastYears);
        dispatch(setGoodPastMetricYears({ goodPastYears, goodPastTypeYears }));
    };

    return (
        <div>
            <Typography
                className={classes.textGoesLeftBold}
            >{`${goodPastType}`}</Typography>
            <Typography
                className={classes.textGoesLeft}
            >{`${goodPastMetricNotesRedux}`}</Typography>
            <TextField
                margin='normal'
                rows={3}
                placeholder='Metric Goes here'
                variant='outlined'
                onChange={handleChange}
                fullWidth={true}
                defaultValue={goodPastMetricRedux}
                type='number'
            />
            {goodPastYears.map((year) => (
                <TextField
                    id={goodPastType + year}
                    key={goodPastType + year}
                    margin='normal'
                    rows={3}
                    placeholder='Metric Goes here'
                    variant='outlined'
                    fullWidth={true}
                    defaultValue={year}
                    type='number'
                />
            ))}

            <Button
                variant='contained'
                color='primary'
                onClick={addOneMoreYear}
                className={classes.root}
            >
                Add one more year
            </Button>
        </div>
    );
};

export default GoodPastField;
