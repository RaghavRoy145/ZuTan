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
                <Typography variant="h6" className='flex-grow'>
                    <a href='/'>
                        Covid Resources
                    </a>
                </Typography>
                <a className='cursor-pointer bg-blue-500 p-2 px-4 rounded shadow' href='/add'>Add</a>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;