const Responses = require('./API_Responses')
const data = {
    1234: { name: 'Sourav Tekken', age: 21, job: 'astronaut' },
    5678: { name: 'Ashwin Alaparthi', age: 21, job: 'instagram influencer' },
    9101: { name: 'Ritik Hariani', age: 21, job: 'CEO OpenCookBook' },
};
exports.handler = async event =>  {
    console.log('event', event)
    return Responses._200(data[ID])
    if(!event.pathParameters || !event.pathParameters.ID) {
        //failed without an ID
        return Responses._400({message: 'missing the ID from the path'})
    }

    let ID = event.pathParameters.ID;

    if(data[ID]) {
        //return data
        return Responses._200(data[ID])
    }

    //failed as ID not in the data
    return Responses._400({message: 'no ID in data'})
};
