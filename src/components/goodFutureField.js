import React, { useState } from 'react';
import {
    addGoodFuturePoint,
    setGoodFuturePoints,
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
}));
const GoodFutureField = ({ understandType }) => {
    let customerPointsRedux = useSelector(
        (state) => state.isItGoodFuture[understandType]
    );
    const dispatch = useDispatch();

    const [understandPoints, setUnderstandPointsReact] = useState(
        customerPointsRedux
    );

    const classes = useStyles();

    const handleChange = (event) => {
        let newCustomerPoints = understandPoints;
        newCustomerPoints[event.target.id] = event.target.value;
        setUnderstandPointsReact(newCustomerPoints);
        dispatch(setGoodFuturePoints({ understandPoints, understandType }));
    };

    const addNewTextField = (event) => {
        dispatch(
            addGoodFuturePoint({
                understandPoint: '',
                understandType: understandType,
            })
        );
        let newCustomerPoints = understandPoints;
        newCustomerPoints.push('');
        setUnderstandPointsReact(newCustomerPoints);
    };

    return (
        <div>
            <Typography>{`${understandType}`}</Typography>
            {understandPoints.map((customerPoint, index) => (
                <TextField
                    id={index}
                    margin='normal'
                    multiline
                    rows={3}
                    placeholder='Write a bullet point about the companys customers'
                    variant='outlined'
                    onChange={handleChange}
                    fullWidth={true}
                    defaultValue={understandPoints[index]}
                />
            ))}

            <Button
                variant='contained'
                color='primary'
                onClick={addNewTextField}
                className={classes.root}
            >
                Add New Customer Bullet Point
            </Button>
        </div>
    );
};

export default GoodFutureField;
