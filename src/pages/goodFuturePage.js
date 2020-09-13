import React from 'react';

import GoodFutureField from '../components/goodFutureField';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
}));

const GoodFuturePage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={6}>
                    <Typography>Understanding the business</Typography>
                    <GoodFutureField understandType='breathAnalysis' />
                    <GoodFutureField understandType='forcesAnalysis' />
                    <GoodFutureField understandType='moatIdentification' />
                    <GoodFutureField understandType='marketGrowth' />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default GoodFuturePage;
