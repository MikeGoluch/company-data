import React, { useState, useEffect, useMemo } from 'react';
import classes from './Companies.module.css';
import axios from '../../axios-config';
import Table from '../../components/UI/Table/Table';

const Companies = (props) => {
    const totalIncomeHandler = (dataIncome) => {
        const incomeArray = [];
        const totalIncome = [];
        for (const company in dataIncome) {
            incomeArray.push(dataIncome[company].data)
        }
        incomeArray.map(cur => {
            let total = 0;
            cur.incomes.map(val => {
                total += parseFloat(val.value);
            })
            totalIncome.push(total.toFixed(2))
        })
        console.log('test', totalIncome)
        return totalIncome;
    }
    const [companyData, setCompanyData] = useState([]);
    const [companyIncome, setCompanyIncome] = useState([]);
    useEffect(() => {
        (async () => {
            const fetchedData = await axios.get('/companies');
            let dataIncome = await Promise.all(fetchedData.data.map(async company => {
                return await axios.get('/incomes/' + `${company.id}`)
            }))
            setCompanyData(fetchedData.data);
            setCompanyIncome(totalIncomeHandler(dataIncome));
        })();
    }, []);
    console.log('cd', companyData);
    console.log('ci', companyIncome);
    const allCompanyData = companyData.map((company, index) => {
        company.value = companyIncome[index];
        return company;
    })
    console.log('ac', allCompanyData)
    const columns = useMemo(() => [
        {
            Header: 'Companies Data',
            columns: [
                {
                    Header: 'ID',
                    accessor: 'id'
                },
                {
                    Header: 'Name',
                    accessor: 'name'
                },
                {
                    Header: 'City',
                    accessor: 'city'
                },
                {
                    Header: 'Total income',
                    accessor: 'value'
                },
            ]
        }
    ]);

    return (
        <Table columns={columns} data={companyData} />
    );
};

export default Companies;