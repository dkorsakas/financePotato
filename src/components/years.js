import React, { useState } from 'react';
import { addYears } from '../redux/actions/valueActions';
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
const Years = () => {
    let yearsRedux = useSelector((state) => state.isItGoodPast.years);
    const dispatch = useDispatch();

    const [years, setYears] = useState(yearsRedux);

    const classes = useStyles();

    const handleChange = (event) =>
        dispatch({
            type: 'SET_BASE_YEAR',
            payload: {
                baseYear: parseInt(event.target.value),
            },
        });

    const addYear = () => {
        console.log('clicked');
    };

    return (
        <div>
            <Typography className={classes.textGoesLeftBold}>
                Set years
            </Typography>
            <TextField
                margin='normal'
                type='number'
                rows={3}
                placeholder='Set base year'
                variant='outlined'
                onChange={handleChange}
                fullWidth={true}
            />

            <Button
                variant='contained'
                color='primary'
                onClick={addYear}
                className={classes.root}
            >
                Add an earlier year
            </Button>
        </div>
    );
};

export default Years;
