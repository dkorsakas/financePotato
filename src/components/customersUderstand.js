import React, { useState } from 'react';
import {
    addCustomerPoint,
    setCustomerPoints,
} from '../redux/actions/valueActions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

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
const CustomersUnderstand = ({ understandType }) => {
    console.log(understandType);
    let customerPointsRedux = useSelector(
        (state) => state.understand[understandType]
    );
    const dispatch = useDispatch();

    const [customerPoints, setCustomerPointsReact] = useState(
        customerPointsRedux
    );

    const classes = useStyles();

    const handleChange = (event) => {
        let newCustomerPoints = customerPoints;
        newCustomerPoints[event.target.id] = event.target.value;
        setCustomerPointsReact(newCustomerPoints);
        dispatch(setCustomerPoints(customerPoints));
    };

    const addNewTextField = (event) => {
        dispatch(addCustomerPoint(''));
        let newCustomerPoints = customerPoints;
        newCustomerPoints.push('');
        setCustomerPointsReact(newCustomerPoints);
    };

    return (
        <div>
            <Typography>Customers</Typography>
            {customerPoints.map((customerPoint, index) => (
                <TextField
                    key={uuidv4()}
                    id={index}
                    margin='normal'
                    multiline
                    rows={3}
                    placeholder='Write a bullet point about the companys customers'
                    variant='outlined'
                    onChange={handleChange}
                    fullWidth={true}
                    defaultValue={customerPoints[index]}
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

export default CustomersUnderstand;
