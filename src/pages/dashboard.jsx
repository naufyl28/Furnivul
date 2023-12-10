import React, { useEffect, useState } from "react";
import { Table, Select } from "flowbite-react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

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

        // Add an "id" property to each transaction using the index
        const transactionsWithId = transactionsData.map(
          (transaction, index) => ({
            ...transaction,
            id: index.toString(),
          })
        );

        console.log("Fetched Transactions Data:", transactionsWithId);
        setTransactions(transactionsWithId);
      } catch (error) {
        console.error("Error fetching transactions from mock API:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleStatusChange = async (index, selectedStatus) => {
    try {
      // Update status in the local state
      const updatedTransactions = [...transactions];
      updatedTransactions[index].status = selectedStatus;
      setTransactions(updatedTransactions);

      // Extract the transaction ID (using the type property for now)
      const transactionId = transactions[index].type;
      console.log("Transaction ID:", transactionId);

      // Send updated status to mock API
      const response = await fetch(
        `https://65312ee04d4c2e3f333c9120.mockapi.io/Transcationdetails/${transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: selectedStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update status in mock API: ${response.statusText}`
        );
      }

      const updatedTransactionData = await response.json();
      console.log("Updated Transaction Data:", updatedTransactionData);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
            <Table.Cell>
              <Select
                value={transaction.status || ""}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                disabled 
              >
                <option value="Manifest">Manifest</option>
                <option value="On-Process">On-Process</option>
                <option value="On-Transit">On-Transit</option>
                <option value="Received On Destination">
                  Received On Destination
                </option>
                <option value="Delivered">Delivered</option>
              </Select>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
};

export default Dashboard;
