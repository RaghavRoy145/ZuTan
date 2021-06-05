import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
    return (
        <div className="flex flex-col w-4/5 mx-auto">
            <div className="flex-auto mt-24 mb-12">
                <p className="font-mono text-center text-2xl">Welcome ! Choose Your Action Below!</p>
            </div>
            <div className="flex-row space-x-3 space-y-4 mx-auto content-center">
                <Link to='/view'>
                    <button className="bg-green-400 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        View
                    </button>
                </Link>
                <Link to='/add'>
                    <button className="bg-green-400 text-white active:bg-lightBlue-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                        Add
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Landing
