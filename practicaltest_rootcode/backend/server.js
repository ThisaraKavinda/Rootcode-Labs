import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// Routers
import expenseRouter from './routes/expense.js';

// Constants
dotenv.config()
const URL=process.env.MONGODB_URL;
const PORT = process.env.PORT || 8060
const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


mongoose.connect(URL, {
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once("open", () => {
    console.log("mongo_db connection success!")
})

// Routers use
app.use('/expense', expenseRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))