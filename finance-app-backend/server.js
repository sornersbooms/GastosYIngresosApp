import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import transactionsRouter from './routes/transactions.js';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/finance-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Routes
app.use('/api/transactions', transactionsRouter);
app.use('/api/items', itemsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
