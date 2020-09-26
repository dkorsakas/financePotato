import React from 'react';

import GoodPastField from '../components/goodPastField';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
}));

const GoodPastPage = () => {
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
                        Past Performance
                    </Typography>
                    <GoodPastField
                        goodPastType='operatingIncome'
                        notesType='operatingIncomeNotes'
                    />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default GoodPastPage;
