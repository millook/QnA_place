import axios from "axios";


const instance = axios.create({
    baseURL: "58.233.243.155:50111",
});

export default instance;