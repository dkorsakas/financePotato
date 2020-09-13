import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
}));

const ReportPage = () => {
    let customerPointsRedux = useSelector(
        (state) => state.understand.customers
    );

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>

                <Grid item xs={6}>
                    <Typography>This is the report page</Typography>
                    <ul className={classes.list}>
                        {customerPointsRedux.map((bulletPoint) => (
                            <Typography>
                                <li key={uuidv4()}>{bulletPoint}</li>
                            </Typography>
                        ))}
                    </ul>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default ReportPage;
