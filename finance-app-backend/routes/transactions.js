import express from 'express';
import Transaction from '../models/Transaction.js'; // Asegúrate de que la extensión .js esté incluida
import sendTelegramMessage from '../telegram.js'; // Importa la función de Telegram

const router = express.Router();

// Obtener todas las transacciones
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

// Crear una nueva transacción
router.post('/', async (req, res) => {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    sendTelegramMessage(`Nueva transacción añadida: ${newTransaction.description} - ${newTransaction.type === 'income' ? '+' : '-'}${newTransaction.amount}`);
    res.json(newTransaction);
});

// Eliminar una transacción
router.delete('/:id', async (req, res) => {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
});

export default router;
