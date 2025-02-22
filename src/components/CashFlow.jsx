import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './CashFlow.module.css';

const CashFlow = ({ transactions, setTransactions }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => console.error('Error fetching transactions:', error));
    }, [setTransactions]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const addTransaction = () => {
        const transaction = {
            description,
            amount: parseFloat(amount),
            type,
            date,
            category // Añadimos la categoría
        };
        axios.post('http://localhost:5000/api/transactions', transaction)
            .then(response => {
                const formattedTransaction = {
                    ...response.data,
                    date: formatDate(response.data.date)
                };
                setTransactions([...transactions, formattedTransaction]);
                setDescription('');
                setAmount('');
                setDate('');
                setCategory(''); // Limpiamos la categoría

                // Mostrar notificación
                toast.success(`Transacción añadida: ${description} - ${type === 'income' ? '+' : '-'}${amount}`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => console.error('Error adding transaction:', error));
    };

    const deleteTransaction = (id) => {
        axios.delete(`http://localhost:5000/api/transactions/${id}`)
            .then(() => {
                setTransactions(transactions.filter(transaction => transaction._id !== id));

                // Mostrar notificación
                toast.info('Transacción eliminada', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(error => console.error('Error deleting transaction:', error));
    };

    const getTotal = (type) => {
        return transactions
            .filter(transaction => transaction.type === type)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    const getCategoryTotal = (type, category) => {
        return transactions
            .filter(transaction => transaction.type === type && transaction.category === category)
            .reduce((sum, transaction) => sum + transaction.amount, 0);
    };

    return (
        <div className={styles.container}>
            <h2>Flujo de Efectivo</h2>
            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripción"
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
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                </select>
            </div>
            <div className={styles.inputGroup}>
                <input
                    className={styles.input}
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Categoría"
                />
            </div>
            <button className={styles.button} onClick={addTransaction}>Agregar Transacción</button>
            <ul className={styles.transactionList}>
                {transactions.map((transaction) => (
                    <li key={transaction._id} className={styles.transactionItem}>
                        {formatDate(transaction.date)} - {transaction.description} ({transaction.category}): {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                        <button className={styles.button} onClick={() => deleteTransaction(transaction._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <h3>Total de Ingresos: ${getTotal('income')}</h3>
            <h3>Total de Gastos: ${getTotal('expense')}</h3>
            <h3>Saldo Neto: ${getTotal('income') - getTotal('expense')}</h3>

            <div>
                <h4>Resumen por Categoría</h4>
                <p>Alimentación: Ingreso: ${getCategoryTotal('income', 'alimentación')} | Gasto: ${getCategoryTotal('expense', 'alimentación')}</p>
                <p>Transporte: Ingreso: ${getCategoryTotal('income', 'transporte')} | Gasto: ${getCategoryTotal('expense', 'transporte')}</p>
                <p>Entretenimiento: Ingreso: ${getCategoryTotal('income', 'entretenimiento')} | Gasto: ${getCategoryTotal('expense', 'entretenimiento')}</p>
                {/* Añade más categorías según sea necesario */}
            </div>
        </div>
    );
};

export default CashFlow;
