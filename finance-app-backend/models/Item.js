import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name: {
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
        enum: ['asset', 'liability']
    },
    date: {
        type: Date,
        required: true
    }
});

const Item = mongoose.model('Item', itemSchema);

export default Item; // Asegúrate de que esté exportando por defecto
