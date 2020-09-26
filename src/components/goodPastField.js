import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setGoodPastMetric, updateNotes } from '../redux/actions/valueActions';
import { useDispatch, useSelector } from 'react-redux';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    textGoesLeftBold: {
        textAlign: 'left',
        fontWeight: 'bold',
    },
    textGoesLeft: {
        textAlign: 'left',
    },
}));
const GoodPastField = ({ goodPastType }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    let goodPastMetricRedux = useSelector(
        (state) => state.isItGoodPast[goodPastType]
    );
    let goodPastNotesRedux = useSelector(
        (state) => state.isItGoodPast[goodPastType + 'Notes']
    );

    let goodPastYears = useSelector((state) => state.isItGoodPast.years);
    let goodPastMetric = goodPastMetricRedux;
    let newNotes = goodPastNotesRedux;

    if (goodPastYears.length !== goodPastMetric.length) {
        if (goodPastYears.length > goodPastMetric.length) {
            console.log('hey');
            goodPastMetric.push(0);
            console.log(goodPastMetric);
        } else if (goodPastYears.length < goodPastMetric.length) {
            goodPastMetric.pop();
            goodPastMetric = [...goodPastMetric];

            console.log('heyLess');
        }
        dispatch(setGoodPastMetric({ goodPastMetric, goodPastType }));
    }

    const handleChange = (event) => {
        goodPastMetric[event.target.id] = parseInt(event.target.value);
        console.log(goodPastMetric);
        dispatch(setGoodPastMetric({ goodPastMetric, goodPastType }));
    };
    const updateNotesReact = (event) => {
        newNotes = event.target.value;
        dispatch(updateNotes({ newNotes, type: goodPastType + 'Notes' }));
    };

    return (
        <div>
            <Typography
                className={classes.textGoesLeftBold}
            >{`${goodPastType}`}</Typography>

            {goodPastMetric.map((metric, index) => (
                <TextField
                    id={index}
                    key={uuidv4()}
                    margin='normal'
                    type='number'
                    rows={3}
                    variant='outlined'
                    onChange={handleChange}
                    fullWidth={true}
                    defaultValue={goodPastMetric[index]}
                />
            ))}
            <Typography
                className={classes.textGoesLeftBold}
            >{`Notes on ${goodPastType}`}</Typography>
            <TextField
                margin='normal'
                multiline
                rows={3}
                variant='outlined'
                onChange={updateNotesReact}
                fullWidth={true}
                defaultValue={goodPastNotesRedux}
            />
        </div>
    );
};

export default GoodPastField;
