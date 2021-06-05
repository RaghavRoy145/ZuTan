import React ,{useState} from 'react'
import {Link} from 'react-router-dom'

const AddBeds = () => {

    const [columns, setColumns] = useState([])
    const [data, setData] = useState({
        resource: "bed",
        city: "",
        info: ""
    })
    const [add, setAdd] = useState(false)
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }
    const handleResource = (res) => {
        let resource = res
        setData({...data, resource})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const arr = columns
        console.log(columns)
        console.log(data)
        arr.push(data)
        setColumns(arr)
        console.log(columns)
        setData({
            resource: "bed",
            city: "",
            info: ""
        })
        setAdd(false)
    }

    const handleClick = (e) => {
        setAdd(true)
    }
    return (
        <React.Fragment>
        <div className="flex flex-col mx-auto font-mono">
            <div className="content-start mt-6 ml-6">
                <Link to='/'>
                    <button className="bg-green-400 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Home
                    </button>
                </Link>
            </div>
            <div className="flex-grow content-end">
                <p className="text-center text-xl text-white font-bold"><button className="bg-green-300 rounded px-8 py-3 mb-6" onClick={handleClick}>Add Data</button></p>
            </div>
                
                { add ? 
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
                    : <React.Fragment>
                        {columns.length ? 
                        
                        <table className="bg-green-50 table-fixed border shadow-lg outline w-4/5 mx-auto" >
                            <tr>
                                <th className="w-1/4 bg-blue-100 border text-left px-8 py-4">Resource</th>
                                <th className="w-1/4 bg-blue-100 border text-left px-8 py-4">City</th>
                                <th className="w-1/2 bg-blue-100 border text-left px-8 py-4">Information</th>
                            </tr> 
                            {columns.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="border px-8 py-4">{item.resource}</td>
                                    <td className="border px-8 py-4">{item.city}</td>
                                    <td className="border px-8 py-4">{item.info}</td>
                                </tr>
                            ))}
                        </table> : <div className="text-center text-2xl"> <h1>No info </h1></div>}
                    </React.Fragment>}
        </div>
        </React.Fragment>
    )
}

export default AddBeds
