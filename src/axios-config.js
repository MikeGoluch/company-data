import axios from 'axios';

const companiesInstance = axios.create({
    baseURL: 'https://recruitment.hal.skygate.io/companies'
});

const incomesInstance = axios.create({
    baseURL: 'https://recruitment.hal.skygate.io/incomes/:id'
});

export { companiesInstance, incomesInstance };