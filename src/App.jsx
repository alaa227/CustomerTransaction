import Data from "./data.json";
import "./App.css";
import { useState } from "react";
import Chartt from "./Chartt";

function App() {
  const [search, setSearch] = useState("");
  const [searchA, setSearchA] = useState("");  console.log(searchA);
  return (
    <>
      <form>
        <input
          type="text"
          placeholder=" search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder=" search by amount"
          onChange={(e) => setSearchA(e.target.value)}
        />
      </form>

      <div>
        {Data &&
          Data.map((obj, i) => {
            return (
              <div key={i}>
                <br />
                <table className=" table-fixed border-collapse border border-slate-500 rounded-lg overflow-hidden w-full">
                  <thead>
                    <tr>
                      <th className="border border-slate-600 bg-slate-300">
                        Customer ID
                      </th>
                      <th className="border border-slate-600 bg-slate-300">
                        Customer Name
                      </th>
                      <th className="border border-slate-600 bg-slate-300">
                        Date of Transaction
                      </th>
                      <th className="border border-slate-600 bg-slate-300">
                        Amount of Transaction
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj.customers &&
                      obj.customers
                        .filter((customer) => {
                          return (
                            search === "" ||
                            customer.name.toLowerCase().includes(search)
                          );
                        })
                        .map((customer) => {
                          const customerTransactions = obj.transactions.filter(
                            (transaction) =>
                              transaction.customer_id === customer.id
                          );
                          return customerTransactions
                            .filter((transaction) => {
                              return (
                                searchA === "" ||
                                transaction.amount.toString().includes(searchA)
                              );
                            })
                            .map((transaction, index) => (
                              <tr key={transaction.id}>
                                {index === 0 && (
                                  <>
                                    <td
                                      className="border border-slate-600"
                                      rowSpan={customerTransactions.length}
                                    >
                                      {customer.id}
                                    </td>
                                    <td
                                      className="border border-slate-600 bg-slate-100"
                                      rowSpan={customerTransactions.length}
                                    >
                                      {customer.name}
                                    </td>
                                  </>
                                )}
                                <td className="border border-slate-600">
                                  {transaction.date}
                                </td>
                                <td className="border border-slate-600">
                                  {transaction.amount}
                                </td>
                              </tr>
                            ));
                        })}
                  </tbody>
                </table>
                <br />
              </div>
            );
          })}
      </div>
      <Chartt/>
    </>
  );
}

export default App;
