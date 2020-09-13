import React from 'react';

import UnderstandField from '../components/uderstandField';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 20,
    },
    boldText: {
        fontWeight: 'bold',
    },
}));
const UnderstandPage = () => {
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
                        Understanding the business
                    </Typography>
                    <UnderstandField
                        understandType='products'
                        notes='Is it a good or service? Is it commodity or a differentiated product? Is it a 
                        luxury or value priced/low cost good? Think plainly - identify the main categories. What problem does the product solve? What is the USP?'
                    />
                    <UnderstandField
                        understandType='customers'
                        notes='Who are the customers - organizations or consumers? Both? What percentages? What is the age, income, gender, area etc. - the more specfic the better'
                    />
                    <UnderstandField
                        understandType='industry'
                        notes='While the industry might seem straighfoward there might be some nuances. Think about the competiton - with whom does the company compete?'
                    />
                    <UnderstandField
                        understandType='form'
                        notes='Form describes the way how business is structured operationally and legaly. While it is usually 
                        unremarkable (most companies whose stocks you can buy are public limted liability companies) sometimes it can be atypical and provide some insight'
                    />
                    <UnderstandField
                        understandType='geography'
                        notes='Geography describes where the businesss customers, operations and headquaters are located, with the emphasis placed on whatever is most enlightening. Geography also reveal things about taxes.'
                    />
                    <UnderstandField
                        understandType='status'
                        notes='This category can be used for a companys prominence, age, transformation, or whatver else merits 
                        singling out, basically here you can mention any other important stuff that you think you should consider to better understand the company'
                    />
                </Grid>
                <Grid item xs></Grid>
            </Grid>
        </div>
    );
};

export default UnderstandPage;
