import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, Button,
} from '@material-ui/core';
import {showAlert} from '../utils/alert';
import client from '../utils/client';
import { connect } from 'react-redux';


const AddTables = ({db, token}) => {

    const dtypes = [
        'INT',
        'VARCHAR',
        'BOOLEAN'
    ]

    const [open, setOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState({
        tableName: '',
        columns: []
    });

    const handleSubmitTable = () => {
        if(!currentTable.tableName) return showAlert('Table name required', 'warning');
        if(currentTable.columns.length === 0) return showAlert('Please insert atleast one column', 'warning');
        const primaryKey = currentTable.columns.filter(col => col.isPrimaryKey);
        if(primaryKey.length == 0) return showAlert('Please set a primary key', 'warning');
        if(primaryKey.length > 1) return showAlert('You cannot have more than 1 primary key');
        const nilColumns = currentTable.columns.filter(col => col.columnName === '');
        if(nilColumns.length > 0) return showAlert('Cannot have empty column name', 'warning');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        const data = {
            table: currentTable,
            id: db._id
        };
        client.post('/database/addTable', data, config)
            .then(res => {
                showAlert('Table succesfully added', 'success');
                setTimeout(() => {window.location.reload()}, 1500);
            }).catch(err => {
                if(err.response) showAlert(err.response.data.message, 'error');
                else showAlert('Server error, please try agian', 'error');
            })
    }


    const handleAddTable = () => {
        setOpen(true);
    }

    const handleDeleteColumn = (index) => {
        const columns = currentTable.columns;
        columns.splice(index, 1);
        setCurrentTable({...currentTable, columns});

    }

    const setPrimaryKey = (index) => {
        const columns = currentTable.columns;
        for(const col of columns) col.isPrimaryKey = false;
        columns[index].isPrimaryKey = true;
        setCurrentTable({...currentTable, columns});
    }

    const setIsNull = (index) => {
        const columns = currentTable.columns;
        columns[index].isNotNull = !columns[index].isNotNull;
        setCurrentTable({...currentTable, columns});
    }

    const setColumnType = (index, type) => {
        const columns = currentTable.columns;
        columns[index].columnType = type;
        setCurrentTable({...currentTable, columns});
    }

    const setColumnName = (index, name) => {
        const columns = currentTable.columns;
        columns[index].columnName = name;
        setCurrentTable({...currentTable, columns});
    }

    const handleAddColumn = () => {
        const newColumn = {
            columnName: '',
            columnType: dtypes[0],
            isPrimaryKey: false,
            isNotNull: true
        }
        const columns = currentTable.columns;
        columns.push(newColumn);
        setCurrentTable({...currentTable, columns});
    }

    const CreateTable = (
        <React.Fragment>
            <DialogTitle>Create Table</DialogTitle>
            <DialogContent>
                
                <div className='flex mt-6'>
                    <input className="flex-grow px-4 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                        type="text" 
                        placeholder="Table name" 
                        value={currentTable.tableName} 
                        onChange={(e) => setCurrentTable({...currentTable, tableName: e.target.value})}
                    />
                    <button className='shadow rounded cursor-pointer mx-2 p-2 text-white bg-green-400'
                        onClick={handleAddColumn}
                    >
                        + &nbsp; Column
                    </button>
                </div>
                <br></br>
                <table className='w-full mb-6'>
                    <thead>
                        <tr>
                            <th className='w-52'>Name</th>
                            <th className='w-52'>Type</th>
                            <th className='w-52'>Primary Key</th>
                            <th className='w-52'>Is Not Null</th>
                            <th className='w-8'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentTable.columns.map((col, index) => (
                        <tr className='w-full'>
                            <td className='w-52'>
                                <input className="px-2 py-1 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                    type="text" 
                                    placeholder="Column name" 
                                    value={col.columnName} 
                                    onChange={(e) => setColumnName(index, e.target.value)}
                                />
                            </td>
                            <td className='w-52 text-center'>
                                <select name={col.columnType} 
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    onChange={(e) => {setColumnType(index, e.target.value)}}
                                >
                                    {dtypes.map((type, i) => (
                                        <option key={i} value={type}>{type}</option>
                                    ))}
                                </select>
                            </td>
                            <td className='w-52 text-center'>
                                <div className='flex p-1 mx-auto cursor-pointer' onClick={() => {setPrimaryKey(index)}}>
                                    <div className='w-4 h-4 border rounded-2xl border-blue-600 flex flex-col justify-center mx-auto'>
                                        <div className={`w-3 h-3 rounded-2xl mx-auto ${col.isPrimaryKey  ? 'bg-blue-600': ''}`}></div>
                                    </div>
                                </div>
                            </td>
                            <td className='w-52 text-center'><input type="checkbox" value={col.isNotNull} onChange={() => setIsNull(index)}/></td>
                            <td className='w-8 text-center'>
                                <div className='border border-gray-400 rounded-2xl cursor-pointer' onClick={() => {handleDeleteColumn(index)}}>
                                    <p className='text-xs text-gray-400'>x</p>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpen(false)}} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmitTable} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </React.Fragment>
    )

    return (
        <React.Fragment>
            <div className='flex mt-6 pt-6 border-t-2 border-gray-300'>
                <p className='text-xl flex-grow'>Tables</p>
                <button className='float-right shadow rounded cursor-pointer mb-6 p-2 text-white bg-green-400'
                    onClick={handleAddTable}
                >
                    + &nbsp; Add Table
                </button>
            </div>




            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true}>
                {CreateTable}
            </Dialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}


export default connect(mapStateToProps)(AddTables);