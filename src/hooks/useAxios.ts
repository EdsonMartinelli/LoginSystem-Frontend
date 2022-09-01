import axios from "axios";

// global instance config
const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

instance.defaults.headers = {
    common : {}, 
    head: {},
    get: {},
    post: {},
    put: {},
    delete: {},
    patch: {}
}

export const useAxios = instance;