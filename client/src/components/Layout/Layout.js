import React from 'react';
import Navbar from './Navbar';


const Layout = (props) => {
    return (
        <div>            
            <Navbar id={props.id}/>            
            <div className='w-4/5 mx-auto'>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;