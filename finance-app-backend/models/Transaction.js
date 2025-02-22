import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    date: {
        type: Date,
        required: true
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction; // Asegúrate de que esté exportando por defecto
