import React from 'react';
import TextField from '@material-ui/core/TextField';
import { setProducts } from '../redux/actions/valueActions';
import { useDispatch, useSelector } from 'react-redux';

const UnderstandPage = () => {
    const counter = useSelector((state) => state.understand.customers);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        console.log('hello');
        dispatch(setProducts(event.target.value));
    };

    return (
        <div>
            <TextField
                margin='normal'
                id='standard-multiline-flexible'
                multiline
                rows={4}
                defaultValue='Describe the companys customers'
                variant='outlined'
                onChange={handleChange}
            />
            <p>{counter}</p>
        </div>
    );
};

export default UnderstandPage;
