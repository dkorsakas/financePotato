import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
}));

const UnderstandReport = () => {
    let understandPointsRedux = useSelector((state) => state.understand);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography>This is the report page</Typography>
            <Typography>Do i understand it?</Typography>
            <Typography>Products</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.products.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
            <Typography>Customers</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.customers.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
            <Typography>Industry</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.industry.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
            <Typography>Form</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.form.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
            <Typography>Geography</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.geography.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
            <Typography>Status</Typography>
            <ul className={classes.list}>
                {understandPointsRedux.geography.map((bulletPoint) => (
                    <Typography>
                        <li key={uuidv4()}>{bulletPoint}</li>
                    </Typography>
                ))}
            </ul>
        </div>
    );
};

export default UnderstandReport;
