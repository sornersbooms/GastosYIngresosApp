import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './BalanceSheet.module.css';

const BalanceSheet = ({ items, setItems }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('asset');
    const [date, setDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/items')
            .then(response => {
                setItems(response.data.map(item => ({
                    ...item,
                    date: formatDate(item.date)
                })));
            })
            .catch(error => console.error('Error fetching items:', error));
    }, [setItems]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const addItem = () => {
        const item = {
            name,
            amount: parseFloat(amount),
            type,
            date
        };
        axios.post('http://localhost:5000/api/items', item)
            .then(response => {
                const formattedItem = {
                    ...response.data,
                    date: formatDate(response.data.date)
                };
                setItems(prevItems => [...prevItems, formattedItem]);
                setName('');
                setAmount('');
                setDate('');

                // Mostrar notificación
                toast.success(`Ítem añadido: ${name} - ${type === 'asset' ? '+' : '-'}${amount}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => console.error('Error adding item:', error));
    };

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/api/items/${id}`)
            .then(() => {
                setItems(items.filter(item => item._id !== id));

                // Mostrar notificación
                toast.info('Ítem eliminado', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => console.error('Error deleting item:', error));
    };

    const getTotal = (type) => {
        return items
            .filter(item => item.type === type)
            .reduce((sum, item) => sum + item.amount, 0);
    };

    const netWorth = getTotal('asset') - getTotal('liability');

    return (
        <div className={styles.container}>
            <h2>Hoja de Balance</h2>
            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Monto"
                />
            </div>
            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div className={styles.inputGroup}>
                <select
                    className={styles.select}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value="asset">Activo</option>
                    <option value="liability">Pasivo</option>
                </select>
            </div>
            <button className={styles.button} onClick={addItem}>Agregar Ítem</button>
            <ul className={styles.itemList}>
                {items.map((item) => (
                    <li key={item._id} className={styles.item}>
                        {formatDate(item.date)} - {item.name}: {item.type === 'liability' ? '-' : '+'}${item.amount}
                        <button className={styles.button} onClick={() => deleteItem(item._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <h3>Total de Activos: ${getTotal('asset')}</h3>
            <h3>Total de Pasivos: ${getTotal('liability')}</h3>
            <h3>Patrimonio Neto: ${netWorth}</h3>
        </div>
    );
};

export default BalanceSheet;
