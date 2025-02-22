import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from './ExportToPDF.module.css';

const ExportToPDF = ({ transactions }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Título del documento
        doc.text('Reporte Financiero', 20, 20);

        // Formatear los datos de las transacciones
        const formattedTransactions = transactions.map(transaction => [
            transaction.date,
            transaction.description,
            transaction.category,
            transaction.type,
            transaction.amount
        ]);

        // Agregar la tabla de transacciones
        doc.autoTable({
            head: [['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Monto']],
            body: formattedTransactions,
            startY: 30,
        });

        // Guardar el PDF
        doc.save('reporte_financiero.pdf');
    };

    return (
        <button className={styles.button} onClick={generatePDF}>Exportar a PDF</button>
    );
};

export default ExportToPDF;
