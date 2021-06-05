import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Covid Stats
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;