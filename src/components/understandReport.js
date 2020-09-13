import React from 'react';

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

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

const UnderstandReport = () => {
    let understandPointsRedux = useSelector((state) => state.understand);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h4'>Do i understand it?</Typography>
            <Typography className={classes.left} variant='h6'>
                Products
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.products.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Customers
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.customers.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Industry
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.industry.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Form
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.form.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Geography
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.geography.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>

            <Typography className={classes.left} variant='h6'>
                Status
            </Typography>
            <List className={classes.list}>
                {understandPointsRedux.status.map((bulletPoint) => (
                    <ListItem divider key={uuidv4()}>
                        <ListItemText primary={`${bulletPoint}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default UnderstandReport;
