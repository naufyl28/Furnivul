import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

const Status = () => {
  const [transactions, setTransactions] = useState([]);
  const loggedInUsername = JSON.parse(localStorage.getItem("name"));

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://65312ee04d4c2e3f333c9120.mockapi.io/Transcationdetails"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions from mock API");
        }

        const transactionsData = await response.json();

        // Log data yang diterima
        console.log("Fetched Transactions Data:", transactionsData);

        // Filter transactions based on logged-in username
        const filteredTransactions = transactionsData.filter(
          (transaction) => transaction.name === loggedInUsername
        );

        // Add an "id" property to each transaction using the index
        const transactionsWithId = filteredTransactions.map(
          (transaction, index) => ({
            ...transaction,
            id: index.toString(),
          })
        );

        setTransactions(transactionsWithId);
      } catch (error) {
        console.error("Error fetching transactions from mock API:", error);
      }
    };

    fetchTransactions();
  }, [loggedInUsername]);

  return (
    <div className="overflow-x-auto m-28">
      <Table>
        <Table.Head>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Province</Table.HeadCell>
          <Table.HeadCell>Subdistrict</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Zipcode</Table.HeadCell>
          <Table.HeadCell>District</Table.HeadCell>
          <Table.HeadCell>Products</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell style={{ width: "190px" }}>Status</Table.HeadCell>
        </Table.Head>
        {transactions.map((transaction, index) => (
          <Table.Row
            key={index}
            className={transaction.status === "Delivered" ? "bg-green-200" : ""}
          >
            <Table.Cell>{transaction.name}</Table.Cell>
            <Table.Cell>{transaction.province}</Table.Cell>
            <Table.Cell>{transaction.subdistrict}</Table.Cell>
            <Table.Cell>{transaction.phone}</Table.Cell>
            <Table.Cell>{transaction.zipcode}</Table.Cell>
            <Table.Cell>{transaction.district}</Table.Cell>
            <Table.Cell>
              {transaction.products.map((product, idx) => (
                <div key={idx}>
                  {product.name} ({product.quantity} pcs)
                </div>
              ))}
            </Table.Cell>
            <Table.Cell>
              {transaction.totalPrice.toLocaleString("id-ID")}
            </Table.Cell>
            <Table.Cell>{transaction.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
};

export default Status;
