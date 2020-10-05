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
                        notes='to do add some stuff here'
                    />
                    <GoodFutureField
                        understandType='forcesAnalysis'
                        notes='to do add some stuff here'
                    />
                    <GoodFutureField
                        understandType='moatIdentification'
                        notes='to do add some stuff here'
                    />
                    <GoodFutureField
                        understandType='marketGrowth'
                        notes='to do add some stuff here'
                    />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default GoodFuturePage;
