import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";

import client from '../utils/client';
import Loading from '../components/Layout/Loading';

import Layout from '../components/Layout/Layout';

const Logos = {
    'mongo': 'https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg',
    'sql':  'https://www.vectorlogo.zone/logos/postgresql/postgresql-horizontal.svg'
}

const DbItem = ({ db }) => {
    const history = useHistory();
    return (
        <div className='w-full rounded shadow-xl border-black p-4 mt-6 bg-white flex cursor-pointer'
            onClick={() => {history.push(`/database/${db._id}`)}}
        >
            <p className='text-xl flex-grow'>{db.name}</p>
            <img src={Logos[db.type]} className='h-10'></img>
        </div>
    );
}

const ViewDatabases = (props) => {

    const [dbs, setDbs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token,
            },
        };
        client.post('/database/retrieve', {}, config)
            .then(res => {
                console.log(res);
                setDbs(res.data.databases);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }, []);
    if(loading) return <Loading/>
    return (
        <Layout>
            <React.Fragment>
            <a href='/createDatabase' className='float-right shadow rounded cursor-pointer mb-6 p-2 text-white bg-green-400'>+ &nbsp; Add</a>
            <div className='flex-col mt-12'>
                {dbs.map(db => <DbItem db={db}/>)}
            </div>
            </React.Fragment>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(ViewDatabases);