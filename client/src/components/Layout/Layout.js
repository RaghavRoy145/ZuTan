import React from 'react';
import Navbar from './Navbar';


const Layout = (props) => {
    return (
        <div>            
            <Navbar/>            
            <div className='pb-14'>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;