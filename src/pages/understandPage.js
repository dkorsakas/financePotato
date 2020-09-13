import React from 'react';
import { setProducts } from '../redux/actions/valueActions';
import { useDispatch, useSelector } from 'react-redux';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    list: {
        textAlign: 'left',
    },
}));
const UnderstandPage = () => {
    let bulletPoints = useSelector((state) => state.understand.customers);
    const dispatch = useDispatch();

    const classes = useStyles();

    const handleChange = (event) => {
        console.log(event.target.value);
    };

    const addNewTextField = (event) => {
        dispatch(setProducts('new customer'));
        console.log(bulletPoints);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs></Grid>

                <Grid item xs={6}>
                    <TextField
                        margin='normal'
                        id='standard-multiline-flexible'
                        multiline
                        rows={3}
                        placeholder='Write a bullet point about the companys customers'
                        variant='outlined'
                        onChange={handleChange}
                        fullWidth={true}
                    />

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={addNewTextField}
                    >
                        Add New Bullet Point
                    </Button>

                    <ul className={classes.list}>
                        {bulletPoints.map((bulletPoint) => (
                            <li key={bulletPoint}>{bulletPoint}</li>
                        ))}
                    </ul>

                    <Typography>s</Typography>
                    <Paper className={classes.paper}>s</Paper>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default UnderstandPage;
