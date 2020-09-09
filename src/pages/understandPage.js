import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const handleChange = (event) => {
    console.log('hello');
};

const understandPage = () => {
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    customers: state.customers,
});

export default connect(mapStateToProps)(understandPage);
