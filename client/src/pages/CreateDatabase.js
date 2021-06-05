import React, {useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

import Layout from '../components/Layout/Layout';
import Loading from '../components/Layout/Loading';

import { showAlert } from '../utils/alert';
import client from '../utils/client';

const CreateDatabase = (props) => {
    const history = useHistory();
    const [dbName, setDbName] = useState('');
    const [dbType, setDbType] = useState('mongo');
    const [loading, setLoading] = useState(false);

    const handleCreateDb = () => {
        if(!dbName) return showAlert('DB Name required', 'warning');
        if(!dbType) return showAlert('DB Type required', 'warning');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token,
            },
        };
        const data = {
            name: dbName,
            type: dbType
        };
        setLoading(true);
        client.post('/database/create', data, config)
            .then(res => {
                showAlert('Database succesfully created', 'success');
                console.log(res);
                setTimeout(() => {
                    setLoading(false);
                    history.push(`/database/${res.data.id}`);
                }, 1500);
            }).catch(err => {
                if(err.response) showAlert(err.response.data.message, 'error');
                else showAlert('Server error, please try agian', 'error');
            })
    }

    const dbs = [{
        type: 'mongo',
        image: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg'
    }, {
        type: 'sql',
        image: 'https://www.vectorlogo.zone/logos/postgresql/postgresql-horizontal.svg'
    }]
    if(loading) return <Loading text='Creating database'/>
    return (
        <Layout>
            <div className='mt-12'>
                <p className='text-2xl mb-12'>Create a database</p>
                <input className="block w-96 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                    type="text" 
                    placeholder="DB Name" 
                    value={dbName} 
                    onChange={(e) => setDbName(e.target.value)}
                />
                <div className='flex'>
                    {dbs.map(db => (
                        <div className='bg-white rounded mt-12 mr-6 cursor-pointer' onClick={() => setDbType(db.type)}>
                            <div className='flex p-1'>
                                <p className='flex-grow'></p>
                                <div className='w-4 h-4 border rounded-2xl border border-blue-600 flex flex-col justify-center'>
                                    <div className={`w-3 h-3 rounded-2xl mx-auto ${dbType === db.type ? 'bg-blue-600': ''}`}></div>
                                </div>
                            </div>
                            <div className='p-3'> 
                                <img src={db.image}/>
                            </div>
                        </div>
                    ))}
                </div>
                <button className='mt-12 p-3 px-6 bg-blue-600 shadow text-white rounded cursor-pointer' onClick={handleCreateDb}>
                    Create
                </button>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(CreateDatabase);