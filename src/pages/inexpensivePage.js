import React from 'react';

import GoodPastFieldYear from '../components/goodPastFieldYear';
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
    textGoesCenterBold: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
}));

const InexpensivePage = () => {
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
                        Is it inexpensive? (inputs)
                    </Typography>

                    <GoodPastFieldYear />

                    <GoodPastField goodPastType='currentSharesOutstanding' />
                    <GoodPastField goodPastType='currentSharePrice' />
                    <GoodPastField goodPastType='preferredEquity' />
                    <GoodPastField goodPastType='cashAndCashEquivalents' />
                    <GoodPastField goodPastType='debt' />
                    <GoodPastField goodPastType='operatingIncome' />
                    <GoodPastField goodPastType='cashFlowFromOperations' />
                    <GoodPastField goodPastType='maintainenceCapitalExpenditures' />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default InexpensivePage;
