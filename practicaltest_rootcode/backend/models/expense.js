import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    
    title: {
        required: true,
        type: String,
    },
    category: {
        required: true,
        type: String,
    },
    des: {
        type: String,
    },
    amount: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    }

});

export const Expense = mongoose.model('expenses', ExpenseSchema);