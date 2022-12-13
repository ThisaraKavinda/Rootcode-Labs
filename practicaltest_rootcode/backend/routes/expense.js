import express, { Router } from 'express';

import { addExpense, getAllExpenses, getExpensesByCategory, deleteExpense, editExpense, getMonthlyReport } from '../controllers/expense.js';

const router = express.Router();

router.post('/add', addExpense);
router.get('/getExpensesByCategory/:category', getExpensesByCategory);
router.get('/getAllExpenses', getAllExpenses);
router.get('/deleteExpense/:id', deleteExpense);
router.post('/editExpense/:id',  editExpense);
router.get("/getMonthlyReport", getMonthlyReport);

export default router;