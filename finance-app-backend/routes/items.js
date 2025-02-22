import express from 'express';
import Item from '../models/Item.js';
import sendTelegramMessage from '../telegram.js';

const router = express.Router();

// Obtener todos los ítems
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// Crear un nuevo ítem
router.post('/', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    sendTelegramMessage(`Nuevo ítem añadido: ${newItem.name} - ${newItem.type === 'asset' ? '+' : '-'}${newItem.amount}`);
    res.json(newItem);
});

// Eliminar un ítem
router.delete('/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

export default router;
