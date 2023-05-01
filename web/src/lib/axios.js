import axios from 'axios'

export const api = axios.create({
    baseURL: "http://localhost:3031"
})

/*
export const api = axios.create({
    baseURL: process.env.BASE_URL
})
*/