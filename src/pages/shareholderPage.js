import React from 'react';

import UnderstandField from '../components/uderstandField';

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
const ShareholderPage = () => {
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
                        Shareholder Friendiness
                    </Typography>
                    <UnderstandField
                        understandType='compensationAndOwnership'
                        notes='Highest paid director should be not more htan x and the highest paid whatever should not be higher than y'
                    />
                    <UnderstandField
                        understandType='relatedPartyTransactions'
                        notes='shady or not?'
                    />
                    <UnderstandField
                        understandType='shareRepurchases'
                        notes='are they buying the shares at a fair price?'
                    />
                    <UnderstandField
                        understandType='dividends'
                        notes='what is the situation with dividends'
                    />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default ShareholderPage;
