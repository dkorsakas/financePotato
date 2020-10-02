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

                    <GoodPastFieldYear />

                    <Typography
                        variant='h5'
                        className={classes.textGoesCenterBold}
                    >
                        Income Statement
                    </Typography>

                    <GoodPastField goodPastType='operatingIncome' />
                    <GoodPastField goodPastType='interestExpense' />
                    <Typography
                        variant='h5'
                        className={classes.textGoesCenterBold}
                    >
                        Balance sheet
                    </Typography>

                    <GoodPastField goodPastType='intangibleAssets' />
                    <GoodPastField goodPastType='cashAndCashEquivalents' />
                    <GoodPastField goodPastType='totalAssets' />
                    <GoodPastField goodPastType='totalEquity' />
                    <GoodPastField goodPastType='nonInterestBearingCurrentLiabilities' />
                    <GoodPastField goodPastType='debt' />
                    <GoodPastField goodPastType='totalLiabilities' />
                    <Typography
                        variant='h5'
                        className={classes.textGoesCenterBold}
                    >
                        Statement of Cashflow
                    </Typography>

                    <GoodPastField goodPastType='cashFlowFromOperations' />
                    <GoodPastField goodPastType='maintainenceCapitalExpenditures' />

                    <Typography
                        variant='h5'
                        className={classes.textGoesCenterBold}
                    >
                        Other
                    </Typography>
                    <GoodPastField goodPastType='numberOfSharesDiluted' />
                    <GoodPastField goodPastType='infilation' />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default GoodPastPage;
