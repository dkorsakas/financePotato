import React from 'react';
import { Link } from 'react-router-dom';

//material ui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';

const navbar = () => {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Button color='inherit' component={Link} to='/'>
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to='/understand'>
                        Do I understand it?
                    </Button>
                    <Button color='inherit' component={Link} to='/good'>
                        Is it good?
                    </Button>
                    <Button color='inherit' component={Link} to='/inexpensive'>
                        Is it inexpensive?
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default navbar;
