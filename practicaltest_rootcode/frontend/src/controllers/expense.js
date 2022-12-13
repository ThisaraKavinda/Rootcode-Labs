import axios from 'axios';

import { baseURL } from '../config';

export const getAllExpenses = async () => {
    const { data } = await axios.get(baseURL + '/expense/getAllExpenses/');
    return data;
}

export const getExpensesByCategory = async (category) => {
    const { data } = await axios.get(baseURL + '/expense/getExpensesByCategory/'+ category);
    return data;
}

export const addExpense = async (newExpense) => {
    const { data } = await axios.post(baseURL + '/expense/add', newExpense);
    return data;
}

export const deletExpences = async (id) => {
    const { data } = await axios.get(baseURL + "/expense/deleteExpense/" + id);
    return data;
};

export const updateExpense = async (id, newExpense) => {
    const { data } = await axios.post(baseURL + '/expense/editExpense/' + id, newExpense);
    return data;
}

export const getMonthlyReport = async () => {
    const { data } = await axios.get(baseURL + "/expense/getMonthlyReport/");
    return data;
}