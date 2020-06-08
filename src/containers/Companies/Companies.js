import React, { useState, useEffect, useMemo } from 'react';
import classes from './Companies.module.css';
import axios from '../../axios-config';
import Table from '../../components/UI/Table/Table';
import Spinner from '../../components/UI/Spinner/Spinner';
import Company from './Company/Company';

const Companies = (props) => {
    const totalIncomeHandler = (dataIncome) => {
        const incomeArray = [];
        const totalIncome = [];
        const companyLastMonthIncome = [];
        for (const company in dataIncome) {
            incomeArray.push(dataIncome[company].data)
        }
        incomeArray.map(cur => {
            let total = 0;
            const baseDate = '2019-06-07';
            const [baseYear, baseMonth] = (baseDate.slice(0, 7)).split('-');
            const lastMonth = [];
            let lastMonthIncome = 0;
            cur.incomes.map(val => {
                total += parseFloat(val.value);
                const [year, month] = (val.date.slice(0, 7)).split('-');
                if (year === baseYear && +month === (+baseMonth - 1)) {
                    lastMonth.push(val.value);
                }
                lastMonthIncome = lastMonth.reduce((acc, cur) => {
                    return parseFloat(acc) + parseFloat(cur);
                }, 0);
                return lastMonthIncome;
            })
            totalIncome.push(total.toFixed(2));
            companyLastMonthIncome.push(lastMonthIncome);
        })
        return { totalIncome, companyLastMonthIncome };
    };
    const avgIncomeHandler = (totalIncome, dataIncome = 50) => {
        const avgIncome = totalIncome.map(income => (parseFloat(income) / dataIncome).toFixed(2));
        return avgIncome;
    };
    const compare = (a, b) => {
        const idA = a.id;
        const idB = b.id;

        let comparison = 0;
        if (idA > idB) {
            comparison = 1;
        } else if (idA < idB) {
            comparison = -1;
        }
        return comparison;
    };
    const [companyData, setCompanyData] = useState([]);
    const [companyIncome, setCompanyIncome] = useState([]);
    const [avgCompanyIncome, setAvgCompanyIncome] = useState([]);
    const [companyLastMonthIncome, setCompanyLastMonthIncome] = useState([]);
    useEffect(() => {
        (async () => {
            const fetchedData = await axios.get('/companies');
            fetchedData.data.sort(compare);
            let dataIncome = await Promise.all(fetchedData.data.map(async company => {
                return await axios.get('/incomes/' + `${company.id}`)
            }))
            const total = totalIncomeHandler(dataIncome);
            setCompanyData(fetchedData.data);
            setCompanyIncome(total.totalIncome);
            setAvgCompanyIncome(avgIncomeHandler(total.totalIncome));
            setCompanyLastMonthIncome(total.companyLastMonthIncome)
        })();
    }, []);
    companyData.map((company, index) => {
        company.value = companyIncome[index];
        return company;
    });
    const onRowClick = (rowInfo) => {
        console.log(rowInfo.row.id)
    }
    const columns = useMemo(() => [
        {
            Header: 'Companies Data',
            columns: [
                {
                    Header: 'ID',
                    accessor: 'id',
                    disableSortBy: true
                },
                {
                    Header: 'Name',
                    accessor: 'name',
                    Cell: row => (
                        <p onClick={() => onRowClick(row)}>{row.value}</p>
                    ),
                    disableSortBy: true
                },
                {
                    Header: 'City',
                    accessor: 'city',
                    disableSortBy: true
                },
                {
                    Header: 'Total income',
                    accessor: 'value'
                },
            ]
        }
    ]);
    const loading = <Spinner />;
    const table = <Table columns={columns} data={companyData} getTrProps={onRowClick} />;
    const data = (companyIncome.length > 0 && companyData.length > 0) ? table : loading;
    const renderSelectedCompanyHandler = (id) => {
        return <Company
            data={companyData[id]}
            total={companyIncome[id]}
            average={avgCompanyIncome[id]}
            lastMonth={companyLastMonthIncome[id]} />
    }
    return (
        <div>
            {data}
            {companyData.length > 0 ? <p>Render selected company</p> : <Spinner />}
        </div>
    );
};

export default Companies;