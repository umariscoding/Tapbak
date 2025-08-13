import React, { useState, useEffect } from "react";
import Table from "../../Components/Table";
import { Input } from "antd";
import Button from "../../Components/base/Button";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../../states/app";

const { Search } = Input;

function Transactions() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const fetchTransactions = async () => {
    const transactions = await getTransactions({
      search_query: searchText
    });
    console.log(transactions);
    setTransactions(transactions.transactions);
  };
  useEffect(() => {
 
    fetchTransactions();
  }, []);

  
  const searchHandler = (value) => {
    setSearchText(value);
    fetchTransactions();
  };

  const headers = [
    {
      label: "Transaction ID",
      key: "id",
      width: "15%",
    },
    {
      label: "Date",
      key: "created_at",
      width: "15%",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      label: "Customer Name",
      key: "customer_id",
      width: "25%",
      render: (_, record) =>
        record.customer?.first_name
          ? record.customer?.first_name + " " + record.customer?.last_name
          : "N/A",
    },
    {
      label: "Points Change",
      key: "transaction_points",
      width: "20%",
      align: "center",
      render: (value) => (
        <div
          className={`text-center ${
            value > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <span className="font-medium">{value > 0 ? `+${value}` : value}</span>
        </div>
      ),
    },
    {
      label: "Payment Received",
      key: "transaction_amount",
      width: "15%",
      align: "right",
      render: (value) => (
        <div className="text-right">
          <span className="font-medium">${value?.toFixed(2)}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-full">
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Transaction History
          </h1>
          <p className="text-gray-600">
            Detailed record of all loyalty points transactions.
          </p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search by transaction ID or customer name"
            allowClear
            size="large"
            onSearch = {searchHandler}
            style={{ width: 420 }}
          />
          <Button
            variant="primary"
            startIcon={<FiPlusCircle />}
            onClick={() => navigate("/process")}
          >
            New Transaction
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm max-w-full mx-auto overflow-hidden">
          <Table
            headers={headers}
            data={transactions}
            rowKey="id"
            size="middle"
            pagination={{
              showSizeChanger: false,
              pageSize: 10,
              showTotal: (total, range) =>
                `Page ${range[0]}-${range[1]} of ${total}`,
              className: "px-4 py-3 border-t",
            }}
            style={{ overflowX: "auto" }}
            className="cursor-pointer hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
