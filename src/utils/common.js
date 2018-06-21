export const base = (process.env.NODE_ENV === 'development' ? "/api" : "");
// import store from "@/vuex/store.js"
import axios from "axios"
axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.BASE_API

axios.interceptors.request.use(config => {
    const token =JSON.parse( window.localStorage.getItem("token"))
    if (token) {
        config.headers['X-Token'] =token
    }
    return config
}, error => {
    Promise.reject(error)
})