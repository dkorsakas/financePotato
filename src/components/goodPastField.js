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
        marginTop: 20,
        marginBottom: 20,
    },
    addSomeSpaceHorizontal: {
        marginLeft: 10,
        marginRight: 10,
    },
    oneAfterAnother: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

    console.log(goodPastMetricRedux, goodPastNotesRedux);

    let goodPastYears = useSelector((state) => state.isItGoodPast.years);
    let goodPastMetric = goodPastMetricRedux;
    let newNotes = goodPastNotesRedux;

    if (goodPastYears.length !== goodPastMetric.length) {
        if (goodPastYears.length > goodPastMetric.length) {
            goodPastMetric.push(0);
            console.log(goodPastMetric);
        } else if (goodPastYears.length < goodPastMetric.length) {
            goodPastMetric.pop();
            goodPastMetric = [...goodPastMetric];
        }
        dispatch(setGoodPastMetric({ goodPastMetric, goodPastType }));
    }

    const handleChange = (event) => {
        if (event.target.value === '') {
            goodPastMetric[event.target.id] = 0;
        } else {
            goodPastMetric[event.target.id] = parseInt(event.target.value);
        }

        console.log(goodPastMetric);
        dispatch(setGoodPastMetric({ goodPastMetric, goodPastType }));
    };
    const updateNotesReact = (event) => {
        newNotes = event.target.value;
        dispatch(updateNotes({ newNotes, type: goodPastType + 'Notes' }));
    };

    let title = goodPastType.charAt(0).toUpperCase() + goodPastType.slice(1);
    title = title.match(/[A-Z][a-z]+|[0-9]+/g).join(' ');

    return (
        <div>
            <Typography
                variant='h6'
                className={classes.textGoesLeftBold}
            >{`${title}`}</Typography>

            {goodPastMetric.map((metric, index) => (
                <div key={uuidv4()} className={classes.oneAfterAnother}>
                    <Typography className={classes.addSomeSpaceHorizontal}>
                        Year {goodPastYears[index]}
                    </Typography>
                    <TextField
                        className={classes.addSomeSpaceHorizontal}
                        id={index}
                        key={uuidv4()}
                        margin='normal'
                        type='number'
                        variant='outlined'
                        onChange={handleChange}
                        defaultValue={goodPastMetric[index]}
                    />
                </div>
            ))}
            <Typography
                className={classes.textGoesLeftBold}
            >{`Notes on ${title}`}</Typography>
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
