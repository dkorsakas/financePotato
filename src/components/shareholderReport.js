import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    left: {
        textAlign: 'left',
        marginTop: 30,
        fontWeight: 'bold',
    },
}));

const ShareholderReport = () => {
    let understandPointsRedux = useSelector((state) => state.understand);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4'>Is it shareholder firendly?</Typography>
            <Typography className={classes.left} variant='h6'>
                Compensation & Ownership
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.compensationAndOwnership.map(
                    (bulletPoint) => (
                        <ListItem divider key={uuidv4()}>
                            <ListItemText primary={`${bulletPoint}`} />
                        </ListItem>
                    )
                )}
            </List>

            <Typography className={classes.left} variant='h6'>
                Related-party transactions
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.relatedPartyTransactions.map(
                    (bulletPoint) => (
                        <ListItem divider key={uuidv4()}>
                            <ListItemText primary={`${bulletPoint}`} />
                        </ListItem>
                    )
                )}
            </List>

            <Typography className={classes.left} variant='h6'>
                Share Repurchases
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.shareRepurchases.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Dividends
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.shareRepurchases.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ShareholderReport;
