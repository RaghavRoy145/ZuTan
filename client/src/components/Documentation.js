const Item = ({ k, v }) => {
    return (<div className="flex justify-start items-baseline">
        <p className="ml-8 p-1" >{k}: </p>
        <p className="">{v}</p>
    </div>)
}

const Documentation = ({ id, type }) => {
    return (
        <div className="w-full mt-16">
            <p className="text-center text-3xl">Database Functions</p>
            <div className=" p-6 rounded-lg text-white bg-gray-800 mt-8 flex flex-col items-center">
                <p className="text-center text-2xl ">To Insert into Database</p>
                <p className="text-center text-lg mt-8">Send a POST Request to <span className="bg-red-500 p-2 rounded font-bold">http://zutan.herokuapp.com/api/database/select</span> with the following data as the body of the request</p>

                <div className="bg-gray-600 w-1/2 p-4 mt-8 rounded-lg text-white">
                    {'{'}<br />
                    <Item k="id" v={id} />
                    <Item k="collection" v={` Name of ${type === 'sql' ? 'SQL Table you want to insert to' : 'Mongo Collection you want to insert to'}`} />
                    <Item k="item" v="JSON object containing Columns and Values to insert, where key is column name and value is the value to insert" />
                    {'}'}<br />
                </div>
            </div>
        </div>
    );
}

export default Documentation;