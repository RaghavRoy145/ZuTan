import axios from 'axios'

const client = axios.create({baseURL: "https://zutan.herokuapp.com/api/"})

export default client;