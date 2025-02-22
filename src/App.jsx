import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import CashFlow from './components/CashFlow';
import BalanceSheet from './components/BalanceSheet';
import Charts from './components/Charts';
import ExportToPDF from './components/ExportToPDF';

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [items, setItems] = useState([]);

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1>Aplicación Financiera</h1>
            </header>

            <ExportToPDF transactions={transactions} />
            <main className={styles.main}>
                <CashFlow transactions={transactions} setTransactions={setTransactions} />
                <BalanceSheet items={items} setItems={setItems} />
                <Charts transactions={transactions} />
                
                <ToastContainer />
            </main>
        </div>
    );
};

export default App;
