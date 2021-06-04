import React, { useState } from 'react';
import {showAlert} from '../utils/alert';
import client from '../utils/client';
import { loginSuccesful } from '../actions/auth';


const Login = () => {

    const [loginDetails, setloginDetails] = useState({
        email: '',
        password: ''
    })

    const [signupDetails, setSignupDetails] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    })

    const [loading, setLoading] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const handleLogin = (e) => {
        e.preventDefault();
        if(!loginDetails.email) return showAlert('Required email', 'warning');
        if(!loginDetails.password) return showAlert('Required password', 'warning');
        setLoading(true);
        client.post('/user/login', loginDetails)
            .then(res => {
                showAlert('Login Succesful!', 'success');
                localStorage.setItem('zutanUser', JSON.stringify(res.data));
                loginSuccesful(res.data);
            }).catch(err => {
                if(err.response) showAlert(err.response.data.message, 'error');
                else showAlert('Server error, please try again', 'error');
                setLoading(false);
            })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if(!signupDetails.email) return showAlert('Required email', 'warning');
        if(!signupDetails.password) return showAlert('Required password', 'warning');
        if(!signupDetails.name) return showAlert('Required name', 'warning');
        if(!signupDetails.confirmPassword) return showAlert('Confirm password', 'warning');
        setLoading(true);
        client.post('/user/register', signupDetails)
            .then(res => {
                showAlert('Signup succesful!', 'success');
                setIsLogin(true);
                setLoading(false);
            }).catch(err => {
                if(err.response) showAlert(err.response.data.message, 'error');
                else showAlert('Server error, please try again', 'error');
                setLoading(false);
            })
        
    }

    const LoginHeader = (
        <React.Fragment>
            <p className='text-3xl mx-auto text-white'>Welcome back!</p>
            <p className='mt-3 mx-auto text-white'>Login to continue to ZuTan</p>

            <button className='border border-white w-1/2 mx-auto mt-12 p-2 text-white rounded-3xl'
                onClick={() => {setIsLogin(false)}}
            >
                Sign Up
            </button>
            <p className='text-sm mx-auto mt-2 text-white'>Don't have an account?</p>
        </React.Fragment>
    )

    const LoginForm = (
        <React.Fragment>
            <p className='mx-auto text-3xl text-green-400'>Sign in to ZuTan</p>
            <form onSubmit={handleLogin}>
            <div className='w-4/5 mx-auto mt-6'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="email" 
                    placeholder="Email" 
                    value={loginDetails.email} 
                    onChange={(e) => setloginDetails({...loginDetails, email: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="password" 
                    placeholder="Password" 
                    value={loginDetails.password} 
                    onChange={(e) => setloginDetails({...loginDetails, password: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto text-center'>
                <button className='border border-white w-1/3 mx-auto mt-12 p-2 text-white bg-green-400 rounded-3xl' 
                    type='submit'
                    disabled={loading}
                >
                    Login
                </button>
            </div>            
            </form>
        </React.Fragment>

    )

    const SignupHeader = (
        <React.Fragment>
            <p className='text-3xl mx-auto text-white'>Welcome to ZuTan</p>
            <p className='mt-3 mx-auto text-white'>Create an account today</p>

            <button className='border border-white w-1/2 mx-auto mt-12 p-2 text-white rounded-3xl'
                onClick={() => {setIsLogin(true)}}
            >
                Login
            </button>
            <p className='text-sm mx-auto mt-2 text-white'>Already have an account?</p>
        </React.Fragment>        
    )

    const SignupForm = (
        <React.Fragment>
            <p className='mx-auto text-3xl text-green-400'>Sign up on ZuTan</p>
            <form onSubmit={handleSignup}>
            <div className='w-4/5 mx-auto mt-6'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="text" 
                    placeholder="Name" 
                    value={signupDetails.name} 
                    onChange={(e) => setSignupDetails({...signupDetails, name: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="email" 
                    placeholder="Email" 
                    value={signupDetails.email} 
                    onChange={(e) => setSignupDetails({...signupDetails, email: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="password"
                    placeholder="Password" 
                    value={signupDetails.password} 
                    onChange={(e) => setSignupDetails({...signupDetails, password: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto'>
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="password"
                    placeholder="Confirm Password" 
                    value={signupDetails.confirmPassword} 
                    onChange={(e) => setSignupDetails({...signupDetails, confirmPassword: e.target.value})}
                />
            </div>
            <div className='w-4/5 mx-auto text-center'>
                <button className='border border-white w-1/3 mx-auto mt-6 p-2 text-white bg-green-400 rounded-3xl' 
                    type='submit'
                    disabled={loading}
                >
                    Sign Up
                </button>
            </div>
            </form>
        </React.Fragment>
    )


    return (
        <div className='rounded w-5/12 h-96 flex shadow-lg absolute left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4 transform'>
            <div className='w-2/5 flex flex-col justify-center bg-green-400'>
                {isLogin? LoginHeader: SignupHeader}
            </div>
            <div className='flex flex-col flex-grow justify-center px-6'>
                {isLogin? LoginForm: SignupForm}
            </div>
        </div>
    )
}


export default Login;