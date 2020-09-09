import React from 'react';
import { Link } from 'react-router-dom';

//material ui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const navbar = () => {
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Link to='/'>Home</Link>
                    <Link to='/understand'>
                        <Button>Do I understand it?</Button>
                    </Link>
                    <Link to='/good'>
                        <Button>Is it good?</Button>
                    </Link>

                    <Button>
                        <Link to='/inexpensive'>Is it inexpensive?</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default navbar;
