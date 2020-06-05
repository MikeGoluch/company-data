import React, { useState, useEffect, useMemo } from 'react';
import classes from './Companies.module.css';
import axios from '../../axios-config';
import Table from '../../components/UI/Table/Table';
const qs = require('qs');

const Companies = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const fetchedData = await axios.get('/companies');
            setData(fetchedData.data);
        })();
        // const fetchData = async () => {
        //     const companiesData = await axios.get('/companies');
        //     // const companiesDataId = companiesData.data.map(company => company.id);
        //     // const companiesIncome = await axios.get('/', {
        //     //     params: {
        //     //         storeIds: [82,39,206]
        //     //     },
        //     //     paramsSerializer: params => {
        //     //         console.log(params.storeIds);
        //     //         // params.storeIds.map(id => id)
        //     //         return qs.stringify(params, { indices: false })
        //     //     }
        //     // })
        //     console.log('cd', companiesData);
        //     // console.log('cdi', companiesIncome);
        // }

        // fetchData();
    }, []);

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
                    // accessor: 'show.total'
                },
            ]
        }
    ]);

    return (
        <Table columns={columns} data={data} />
    );
};

export default Companies;