import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

const View = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = 'https://zutan.herokuapp.com/api/database/select';
        const data = {
            id: '60bbe1a6a0403e002158aa6a',
            collection: 'covid'
        }
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.post(url, data, headers)
            .then(res => {
                console.log(res);
                setLoading(false);
                setItems(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="p-6 mx-auto">
            <table className="bg-green-50 table-fixed border shadow-lg outline w-4/5 mx-auto" >
                <tr>
                    <th className="w-1/3 bg-blue-100 border text-left px-8 py-4">Resource</th>
                    <th className="w-1/3 bg-blue-100 border text-left px-8 py-4">City</th>
                    <th className="w-1/3 bg-blue-100 border text-left px-8 py-4">Information</th>
                </tr> 
                {loading? <p>Loading...</p>: null}
                {items.map((item, idx) => (
                    <tr key={idx}>
                        <td className="border px-8 py-4">{item.resource}</td>
                        <td className="border px-8 py-4">{item.city}</td>
                        <td className="border px-8 py-4">{item.info}</td>
                    </tr>
                ))}
            </table> 
        </div>
    )
}

export default View
