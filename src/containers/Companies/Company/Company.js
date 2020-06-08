import React from 'react';

const company = (props) => {
    return (
        <div>
            <p>Company name: {props.data.name}</p>
            <p>Location: {props.data.city}</p>
            <p>Company's total income: {props.data.value}</p>
            <p>Company's average income: {props.average}</p>
            <p>Company's income in last month: {props.lastMonth}</p>
        </div>
    );
};

export default company;