import React from 'react';
import { Link } from 'react-router-dom';

//material ui stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import Typography from '@material-ui/core/Typography';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    <Button
                        color='inherit'
                        aria-controls='simple-menu'
                        aria-haspopup='true'
                        onClick={handleClick}
                    >
                        Is it good?
                    </Button>
                    <Menu
                        id='simple-menu'
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            to='/goodpast'
                        >
                            Past perfromance
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            to='/goodfuture'
                        >
                            Future performance
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            to='/shareholder'
                        >
                            Shareholder friendliness
                        </MenuItem>
                        <MenuItem
                            onClick={handleClose}
                            component={Link}
                            to='/cheating'
                        >
                            NASDAQ data
                        </MenuItem>
                    </Menu>

                    <Button color='inherit' component={Link} to='/inexpensive'>
                        Is it inexpensive?
                    </Button>
                    <Button color='inherit' component={Link} to='/report'>
                        Report
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
