const Item = ({ k, v }) => {
    return (<div className="flex justify-start items-baseline">
        <p className="ml-8 p-1" >{k}: </p>
        <p className="">{v}</p>
    </div>)
}

const Documentation = ({ id, type }) => {
    return (
        <div className="w-full mt-16">
            <p className="text-center text-3xl">Querying the database</p>
            <div className=" p-6 rounded-lg text-white bg-gray-800 mt-8 flex flex-col">
                <p className='mx-auto'>Every request is sent as a POST request with two mandatory items in the body</p>
                <div className="bg-gray-500 w-1/2 p-4 mt-6 rounded-lg text-white mx-auto">
                    {'{'}<br />
                    <Item k="id" v={id} />
                    <Item k="collection" v={` <Name of ${type === 'sql' ? 'SQL Table you want to query' : 'Mongo Collection you want to query'}>`} />
                    {'}'}<br />
                </div>

                <p className="text-2xl mt-6">To Insert into database</p>
                <p className="text-lg mt-4">Send a POST Request to <span className="text-red-500 p-2 rounded font-bold">http://zutan.herokuapp.com/api/database/insert</span> with the following body format</p>

                <div className='flex'>
                    <div className="bg-gray-600 w-1/2 p-4 mt-4 rounded-lg text-white">
                        {'{'}<br />
                        <Item k="id" v={id} />
                        <Item k="collection" v={'"users"'} />
                        <Item k="item" v="{ username: 'darthvader', name: 'Anakin Skywalker', email: 'annykins@me.com'}" />
                        {'}'}<br />
                    </div>
                    <div className='mt-4 p-3'>
                        <p>This query would insert the given <b>item</b> object, representing key value pairs as the fields and values into a collection named <b>users</b></p>
                    </div>
                </div>
                

                <p className="text-2xl mt-8">To find from database</p>
                <p className="text-lg mt-4">Send a POST Request to <span className="text-red-500 p-2 rounded font-bold">http://zutan.herokuapp.com/api/database/select</span> with the following body format</p>

                <div className='flex w-full'>
                    <div className="bg-gray-600 w-1/2 p-4 mt-4 rounded-lg text-white flex-grow">
                        {'{'}<br />
                        <Item k="id" v={id} />
                        <Item k="collection" v={'"users"'} />
                        <Item k="filter" v="{ username: 'darthvader', name: 'Anakin Skywalker'}" />
                        <Item k="required" v="[ 'email' ]" />
                        {'}'}<br />
                    </div>
                    <div className='mt-4 p-3'>
                        <p>This query would search the collection <b>users</b> for items having <b>username</b> as <b>darthvader</b> and <b>name</b> as <b>Anakin Skywalker</b>. Only the <b>email</b> field of the results would be returned. In case the <b>filter</b> and <b>required</b> fields are missing, all items in the collection would be retrieved.</p>
                    </div>
                </div>


                <p className="text-2xl mt-8">To delete from database</p>
                <p className="text-lg mt-4">Send a POST Request to <span className="text-red-500 p-2 rounded font-bold">http://zutan.herokuapp.com/api/database/delete</span> with the following body format</p>

                <div className='flex w-full'>
                    <div className="bg-gray-600 w-1/2 p-4 mt-4 rounded-lg text-white">
                        {'{'}<br />
                        <Item k="id" v={id} />
                        <Item k="collection" v={'"users"'} />
                        <Item k="filter" v="{ age: 96 }" />
                        {'}'}<br />
                    </div>
                    <div className='mt-4 p-3'>
                        <p>This query would delete all items with an <b>age</b> value of 96 from the collection <b>users</b>. In case of a missing filter field, all items from the collection would be deleted.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Documentation;