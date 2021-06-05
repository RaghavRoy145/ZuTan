import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';

import copyToClipboard from '../../utils/clipboard';
import {showAlert} from '../../utils/alert';

const Navbar = ({id}) => {

    const handleCopy = (id) => {
        copyToClipboard(id);
        showAlert('Database id copied!', 'success');
    }
    return (
        <AppBar position="static">
            <Toolbar className='flex bg-black'>
                <Typography variant="h6" className='flex-grow'>
                    ZuTan
                </Typography>
                {id? <button className='p-2 bg-white text-black rounded' onClick={() => handleCopy(id)}>Copy ID</button>: null}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;