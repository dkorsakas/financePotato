import React from 'react';

// import { v4 as uuidv4 } from 'uuid';
import UnderstandReport from '../components/understandReport';
import GoodFutureReport from '../components/goodFutureReport';
import GoodPastReport from '../components/goodPastReport';
import ShareholderReport from '../components/shareholderReport';
import InxepensiveReport from '../components/inexpensiveReport';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
    },
}));

const ReportPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>

                <Grid item xs={6}>
                    <UnderstandReport />
                    <GoodPastReport />
                    <GoodFutureReport />
                    <ShareholderReport />
                    <InxepensiveReport />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default ReportPage;
