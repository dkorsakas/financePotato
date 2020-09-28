import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Divider from '@material-ui/core/Divider';

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

const GoodFutureReport = () => {
    let goodFuturePoints = useSelector((state) => state.isItGoodFuture);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4'>Is it good (future) ?</Typography>
            <Typography className={classes.left} variant='h6'>
                Breath Analysis
            </Typography>
            <List className={classes.list}>
                {goodFuturePoints.breathAnalysis.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Forces Analysis
            </Typography>
            <List className={classes.list}>
                {goodFuturePoints.forcesAnalysis.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Moat Identification
            </Typography>
            <List className={classes.list}>
                {goodFuturePoints.moatIdentification.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Market Growth
            </Typography>
            <List className={classes.list}>
                {goodFuturePoints.marketGrowth.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default GoodFutureReport;
