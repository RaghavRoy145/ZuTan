import React from 'react'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Layout from '../components/Layout/Layout';
import { showAlert } from '../utils/alert';
import client from '../utils/client';


const ShowDatabase = (props) => {
    
    const [URLid, setId] = useState(0)

    const [numcols, setCols] = useState(0)
    const [cols, setColsArr] = useState([])
    const [chosen, setChosen] = useState(false)


    const dtypes = [
        'INT',
        'STRING',
        'NUMBER'
    ]

    const handleChange = (e) => {
        setCols(e.target.value)
    }

    const handleSubmit =  (e) => {
        const newArr = []
        for(let i = 0; i < numcols; i++){
            
            newArr.push({
                colId: i,
                colname: '',
                dtype: '',
                isPrimaryKey: false,        
            })
        }
        setColsArr(newArr)
        setChosen(true)
    }

    const Update = (e) => {
        console.log(e.target.name)
        const updatedArr = cols.map((item, idx) => {console.log(idx, typeof(idx)); console.log(e.target.id, typeof(e.target.id), idx == parseInt(e.target.id)); return toString(idx) == e.target.id ? {...item, [e.target.name] : e.target.value} : item })
        console.log()
        console.log(updatedArr)
        setColsArr(updatedArr)
    }

    const handleSubmitForm = (e) =>{
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': props.token,
            },
        };
        setId(props.match.params.id)
    }
    return (
        <Layout>
            { chosen ?
                <React.Fragment>
                    <p className='mx-auto text-xl'>Create Table</p>
                    <form onSubmit={handleSubmitForm} className="bg-darkblue shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        {cols.map((item, index) => (
                            <div key = {index}>
                                <input type="text" name = {item.colname} id={index}  defaultValue={item.colname} placeholder={`column${index+1}`} onChange = {Update} className="shadow appearance-none border rounded mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/> 
                                <select name = {item.dtype} id = {index} onChange = {Update} className="shadow appearance-none border rounded mx-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    {dtypes.map((type, i) =>(
                                        <option key = {i} value={type}>{type}</option>
                                    ))}
                                </select>
                                <input type="checkbox" value={false} id={index} onChange = {Update} />
                            </div>
                        ))}
                        <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create</button>
                    </form>
                </React.Fragment> :
                <React.Fragment>
                    <form className="bg-darkblue shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <label>Enter number of Columns</label><br/>
                        <input type="number" name="numcols" onChange={handleChange}/> <br/>
                        <button type="submit" onClick={handleSubmit} className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </form>
                </React.Fragment> 
            }
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(ShowDatabase);
