import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography, Menu, MenuItem
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import copyToClipboard from '../../utils/clipboard';
import {showAlert} from '../../utils/alert';

import {logout} from '../../actions/auth';

const Navbar = ({id}) => {

    const handleCopy = (id) => {
        copyToClipboard(id);
        showAlert('Database id copied!', 'success');
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
            <Toolbar className='flex bg-black'>
                <Typography variant="h6" className='flex-grow'>
                    ZuTan
                </Typography>
                {id? <button className='p-2 bg-white text-black rounded mx-4' onClick={() => handleCopy(id)}>Copy ID</button>: null}
                <AccountCircleIcon onClick={handleClick} className='cursor-pointer'/>

                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>   
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;