import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Dialog, DialogTitle, DialogContent,
} from '@material-ui/core';


import Loading from '../components/Layout/Loading';
import Layout from '../components/Layout/Layout';
import AddTables from './AddTables';

import client from '../utils/client';
import Documentation from '../components/Documentation';



const ShowDatabase = (props) => {

    const [currentTable, setCurrentTable] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dbData, setDbData] = useState({});
    const [open, setOpen] = useState(false);

    const selectTable = (index) => {
        setCurrentTable(index);
        setOpen(true);
    }

    const Logos = {
        'mongo': 'https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg',
        'sql': 'https://www.vectorlogo.zone/logos/postgresql/postgresql-horizontal.svg'
    }

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token,
            },
        };
        client.post('/database/getDb', { id: props.match.params.id }, config)
            .then(res => {
                console.log(res.data.database);
                setDbData(res.data.database);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }, []);


    if (loading) return <Loading />
    return (
        <Layout id={dbData._id}>
            <React.Fragment>
                <div className='flex mt-8'>
                    <p className='flex-grow text-2xl'>{dbData.name}</p>
                    <img src={Logos[dbData.type]} className='h-10'></img>
                </div>
                {dbData.type === 'sql' ? <AddTables db={dbData} /> : null}
                <div className='flex'>
                    {dbData.tables.map((table, index) => {
                        return (
                            <div className='w-1/4 p-4 mx-2 shadow-md rounded-xl cursor-pointer bg-white text-center'
                                onClick={() => selectTable(index)}
                            >
                                {table.tableName}
                            </div>
                        )
                    })}
                </div>
                <Documentation id={dbData._id} type={dbData.type}/>
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                    {dbData.tables.length ?
                        <React.Fragment>
                            <DialogTitle>{dbData.tables[currentTable].tableName}</DialogTitle>
                            <DialogContent>
                                <table className='w-full mb-6'>
                                    <thead>
                                        <tr>
                                            <th className='w-52'>Name</th>
                                            <th className='w-52'>Type</th>
                                            <th className='w-52'>Primary Key</th>
                                            <th className='w-52'>Is Not Null</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dbData.tables[currentTable].columns.map((col, index) => (
                                            <tr className='w-full'>
                                                <td className='w-52 text-center'>
                                                    <p>{col.columnName}</p>
                                                </td>
                                                <td className='w-52 text-center'>
                                                    <p>{col.columnType}</p>
                                                </td>
                                                <td className='w-52 text-center'>
                                                    <div className='flex p-1 mx-auto'>
                                                        <div className='w-4 h-4 border rounded-2xl border-blue-600 flex flex-col justify-center mx-auto'>
                                                            <div className={`w-3 h-3 rounded-2xl mx-auto ${col.isPrimaryKey ? 'bg-blue-600' : ''}`}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='w-52 text-center'><input type="checkbox" disabled value={col.isNotNull} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </DialogContent>
                        </React.Fragment>
                        : null}
                </Dialog>
            </React.Fragment>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(ShowDatabase);
