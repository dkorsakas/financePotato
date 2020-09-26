import React from 'react';

import GoodFutureField from '../components/goodFutureField';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
    },
    boldText: {
        fontWeight: 'bold',
    },
}));

const GoodFuturePage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Typography
                        className={(classes.root, classes.boldText)}
                        variant='h4'
                    >
                        Future Performance
                    </Typography>
                    <GoodFutureField
                        understandType='breathAnalysis'
                        notes='Who are the customers - organizations or consumers? Both? What percentages? What is the age, income, gender, area etc. - the more specfic the better'
                    />
                    <GoodFutureField
                        understandType='forcesAnalysis'
                        notes='Who are the customers - organizations or consumers? Both? What percentages? What is the age, income, gender, area etc. - the more specfic the better'
                    />
                    <GoodFutureField
                        understandType='moatIdentification'
                        notes='Who are the customers - organizations or consumers? Both? What percentages? What is the age, income, gender, area etc. - the more specfic the better'
                    />
                    <GoodFutureField
                        understandType='marketGrowth'
                        notes='Who are the customers - organizations or consumers? Both? What percentages? What is the age, income, gender, area etc. - the more specfic the better'
                    />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default GoodFuturePage;
