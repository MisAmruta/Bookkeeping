import axios from 'axios'

const instance = axios.create({
    baseURL: "https://bookkeeping01.herokuapp.com"
    // baseURL: "http://localhost:5000"
})

export default instance;