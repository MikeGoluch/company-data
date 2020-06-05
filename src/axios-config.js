import axios from 'axios';

const companiesInstance = axios.create({
    baseURL: 'https://recruitment.hal.skygate.io/'
});


export default companiesInstance;