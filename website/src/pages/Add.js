import React from 'react'
import {Link} from 'react-router-dom'

const AddBeds = () => {
    return (
        <div className="flex flex-col mx-auto">
            <div className="content-start mt-6 ml-6">
                <Link to='/'>
                    <button className="bg-green-400 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Home
                    </button>
                </Link>
            </div>
            <div className="flex-auto">
                <p className="text-center text-xl">Add</p>
            </div>
        </div>
    )
}

export default AddBeds
