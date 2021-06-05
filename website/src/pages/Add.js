import axios from 'axios'
import React ,{useState} from 'react'
import {Link} from 'react-router-dom'

const AddBeds = () => {

    const [data, setData] = useState({
        resource: "bed",
        city: "",
        info: ""
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleResource = (res) => {
        let resource = res
        setData({...data, resource})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = 'https://zutan.herokuapp.com/api/database/insert';
        const content = {
            id: '60bbe1a6a0403e002158aa6a',
            collection: 'covid',
            item: {
                ...data,
                id: Math.floor(Math.random() * 10000)
            }
        }
        console.log(content);
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(url, content, headers)
            .then(res => {
                window.location.href = '/';
            }).catch(err => {
                console.log(err);
            })
    }


    return (
        <React.Fragment>
        <div className="flex flex-col mx-auto font-mono mt-12">
            <div className="flex-grow content-end">
                <p className="text-center text-xl text-black font-bold">Add Data</p>
            </div>
                
            <React.Fragment>
                <form onSubmit={handleSubmit} className="mx-auto w-4/5">
                    <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Resource
                    </label>
                    <select name="resource" value={data.resource} onChange={(e) => handleResource(e.target.value)} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option value="bed">Bed</option>
                            <option value="tablet">Tablet</option>
                            <option value="vaccine">Vaccine</option>
                            <option value="oxygen">Oxygen Tank</option>
                    </select>
                    <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        City
                    </label>
                    <input required type="text" name="city" value={data.city} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                    <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Info
                    </label>
                    <input required type="text" name="info" value={data.info} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"/>
                    <button type="submit" className="mt-4 bg-green-400 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Submit
                    </button>
                </form>
            </React.Fragment>
        </div>
        </React.Fragment>
    )
}

export default AddBeds
