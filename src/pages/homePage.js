import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 30,
    },
    margin40: {
        margin: 40,
    },
    boldText: {
        fontWeight: 'bold',
    },
}));

const HomePage = () => {
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
                        Value Investing Model By Kenneth Jeffrey Marshall
                    </Typography>
                    <Typography>Website version: 0.9</Typography>
                    <Typography align='left' className={classes.margin40}>
                        Hi, I took a value investing course by KJM and really
                        enjoyed it. In the course we had to analyze various
                        companies using the value investing model proposed in
                        his book "Good Stocks Cheap". I made this website to
                        make the analysis procedure more pleasant and
                        streamlined (at least for myself).
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        If you have to do a more serious analysis probably you
                        should go with excel and word. I use this website as
                        reminder of the key structure and formulas and also for
                        a prelminary analysis.
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        You can learn more about the book and where to get it by
                        going to:
                        <Link href='http://www.goodstockscheap.com'>
                            {' '}
                            www.goodstockscheap.com
                        </Link>
                        . Also please keep in mind that this website was made
                        purely for educational purposes
                    </Typography>
                    <Typography
                        align='left'
                        variant='h5'
                        className={classes.margin40}
                    >
                        How to use the website?
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        It is actually quite simple: all you need to do is just
                        go page by page and fill out the relevant information.
                        Once you add the information it will appear on the page
                        called Report.
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        You should start by answering the question: do I
                        udnertand it? Then go to the question: is it good? and
                        lastly finish off by answering whether it is expensive
                        or not. If at any of the stage you get a NO -> dont buy
                        this stock.
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        The website should work on Chrome quite well (but i did
                        not test the functionality for other browsers). Also
                        everything is saved in your browsers{' '}
                        <Link href='https://en.wikipedia.org/wiki/Web_storage'>
                            {' '}
                            local storage
                        </Link>
                        . So as long as you do not clear out your cookies or
                        your local storage you can always refresh or close the
                        website and all of the information will still be saved
                        and will be waiting for you.
                    </Typography>
                    <Typography align='left' className={classes.margin40}>
                        In case you want to delete your analysis and start over
                        from scratch there is a large red 'delete button' at the
                        end of the report page (but be careful).
                    </Typography>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default HomePage;
