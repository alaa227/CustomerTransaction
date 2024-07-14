// src/Chartt.js
import React, { useState, useEffect } from "react";
import Data from "./data.json";
import { Line } from "react-chartjs-2";

function Chartt() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (Data.customers && Data.customers.length > 0) {
      setSelectedCustomer(Data);
      console.log("1");
    }
  }, []);

  if (!selectedCustomer) {
    return <div>Chart Is Loading...</div>;
  }

  const customerTransactions = Data.transactions.filter(
    (transaction) => transaction.customer_id === selectedCustomer.id
  );

  const chartData = {
    labels: customerTransactions.map((transaction) => transaction.date),
    datasets: [
      {
        label: `Total Transactions for ${selectedCustomer.name}`,
        data: customerTransactions.map((transaction) => transaction.amount),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Transaction Chart for {selectedCustomer.name}</h2>
      <Line data={chartData} options={options} />
      <select
        onChange={(e) =>
          setSelectedCustomer(
            Data.customers.find((customer) => customer.id == e.target.value)
          )
        }
        value={selectedCustomer.id}
      >
        {Data.customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Chartt;
