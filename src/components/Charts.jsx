import React from 'react';
import { VictoryBar, VictoryPie, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import styles from './Charts.module.css';

const Charts = ({ transactions }) => {
    const incomeData = transactions.filter(t => t.type === 'income').map(t => ({ ...t, amount: Math.abs(t.amount) }));
    const expenseData = transactions.filter(t => t.type === 'expense').map(t => ({ ...t, amount: Math.abs(t.amount) }));

    const aggregateData = (data) => {
        const result = {};
        data.forEach(item => {
            if (result[item.category]) {
                result[item.category] += item.amount;
            } else {
                result[item.category] = item.amount;
            }
        });
        return Object.entries(result).map(([category, amount]) => ({ category, amount }));
    };

    const incomeByCategory = aggregateData(incomeData);
    const expenseByCategory = aggregateData(expenseData);

    return (
        <div className={styles.container}>
            <h2>Gráficos de Ingresos y Gastos</h2>
            <div className={styles.chartContainer}>
                <h3>Ingresos por Categoría</h3>
                <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                    <VictoryAxis />
                    <VictoryAxis dependentAxis />
                    <VictoryBar
                        data={incomeByCategory}
                        x="category"
                        y="amount"
                        style={{ data: { fill: "#4caf50" } }}
                    />
                </VictoryChart>
            </div>
            <div className={styles.chartContainer}>
                <h3>Gastos por Categoría</h3>
                <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
                    <VictoryAxis />
                    <VictoryAxis dependentAxis />
                    <VictoryBar
                        data={expenseByCategory}
                        x="category"
                        y="amount"
                        style={{ data: { fill: "#f44336" } }}
                    />
                </VictoryChart>
            </div>
            <div className={styles.chartContainer}>
                <h3>Distribución de Ingresos</h3>
                <VictoryPie
                    data={incomeByCategory}
                    x="category"
                    y="amount"
                    colorScale={["#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107"]}
                />
            </div>
            <div className={styles.chartContainer}>
                <h3>Distribución de Gastos</h3>
                <VictoryPie
                    data={expenseByCategory}
                    x="category"
                    y="amount"
                    colorScale={["#f44336", "#e57373", "#ff8a65", "#ffb74d", "#ffd54f"]}
                />
            </div>
        </div>
    );
};

export default Charts;
