import React from 'react';

import CustomersUnderstand from '../components/customersUderstand';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
}));
const UnderstandPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Typography>Understanding the business</Typography>
                    <CustomersUnderstand understandType='customers' />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default UnderstandPage;
