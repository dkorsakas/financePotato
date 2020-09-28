import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    setGoodPastMetricYears,
    setBaseYear,
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
        marginTop: 20,
        marginBottom: 20,
    },
    textGoesLeft: {
        textAlign: 'left',
    },
}));
const GoodPastYearField = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    let goodPastYearsRedux = useSelector((state) => state.isItGoodPast.years);

    let baseYearRedux = useSelector((state) => state.isItGoodPast.baseYear);

    let goodPastYears = goodPastYearsRedux;

    if (goodPastYears.length <= 0) {
        goodPastYears = [baseYearRedux];
    }

    const handleChange = (event) => {
        dispatch(setBaseYear(parseInt(event.target.value)));

        if (goodPastYears[0] !== parseInt(event.target.value)) {
            goodPastYears[0] = parseInt(event.target.value);

            for (let i = 1; i < goodPastYears.length; i++) {
                goodPastYears[i] = goodPastYears[i - 1] - 1;
            }
            dispatch(
                setGoodPastMetricYears({
                    goodPastYears: [...goodPastYears],
                    goodPastTypeYears: 'years',
                })
            );
        }
    };

    const addOneMoreYear = () => {
        dispatch(
            setGoodPastMetricYears({
                goodPastYears: [
                    ...goodPastYears,
                    goodPastYears[goodPastYears.length - 1] - 1,
                ],
                goodPastTypeYears: 'years',
            })
        );
    };
    const removeYear = () => {
        if (goodPastYears.length > 1) {
            goodPastYears.pop();

            dispatch(
                setGoodPastMetricYears({
                    goodPastYears: [...goodPastYears],
                    goodPastTypeYears: 'years',
                })
            );
        }
    };

    return (
        <div>
            <Typography variant='h5' className={classes.textGoesLeftBold}>
                Choose years
            </Typography>
            <Typography className={classes.textGoesLeftBold}>
                Latest (base) year:
            </Typography>
            <TextField
                margin='normal'
                rows={3}
                placeholder='Enter base year'
                variant='outlined'
                onChange={handleChange}
                fullWidth={true}
                type='number'
            />
            <Typography className={classes.textGoesLeftBold}>
                Current years in use:
            </Typography>
            {goodPastYears.map((year) => (
                <Typography className={classes.textGoesLeftBold} key={uuidv4()}>
                    Year: {year}
                </Typography>
            ))}

            <Button
                variant='contained'
                color='primary'
                onClick={addOneMoreYear}
                className={classes.root}
            >
                Add one more year
            </Button>
            <Button
                variant='contained'
                color='primary'
                onClick={removeYear}
                className={classes.root}
            >
                Remove one year
            </Button>
        </div>
    );
};

export default GoodPastYearField;
