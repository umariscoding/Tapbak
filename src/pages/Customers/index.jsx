import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../Components/Table";
import { Input } from "antd";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "../../Components/base/Button";
import { getCustomerData, updateCustomerStatus } from "../../states/app";

const { Search } = Input;

function Customers() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [customerData, setCustomerData] = useState([]);
  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    const data = await getCustomerData({
      search_query : searchText
    });
    setCustomerData(data.customers);
  };

  const headers = [
    { label: "Customer ID", key: "id", width: "15%" },
    {
      label: "Name",
      key: "name",
      width: "15%",
      render: (_, record) => `${record.first_name} ${record.last_name}`,
    },
    { label: "Email", key: "email", width: "20%", ellipsis: true },
    {
      label: "Loyalty Points",
      key: "points",
      width: "15%",
      align: "center",
      render: (_, record) => (
        <div className="text-center">
          <span className="text-blue-600 font-medium">{record?.loyalty_card?.loyalty_points}</span>
        </div>
      ),
    },
    {
      label: "Joined Date",
      key: "created_at",
      width: "12%",
      render: (date) => date.split("T")[0],
    },
    {
      label: "Award Available",
      key: "no_of_rewards",
      width: "12%",
      align: "center",
      render: (_, record) => (
        <div className="text-center">
          <span className="text-blue-600 font-medium">{record?.loyalty_card?.reward_available ? "Yes" : "No"}</span>
        </div>
      ),
    },
    {
      label: "Actions",
      key: "actions",
      width: "10%",
      render: (_, record) => (
        <div className="flex gap-3">
          <Button
            variant="text"
            size="small"
            startIcon={<FiEdit2 size={18} />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/process?customer_id=${record.id}`);
            }}
          />
          <Button
            variant="text"
            size="small"
            startIcon={<FiTrash2 size={18} />}
            onClick={(e) => {
              e.stopPropagation();
              updateCustomerStatus(record.id, "inactive").then(() => {
                fetchCustomerData();
              });
            }}
            className="text-gray-600 hover:text-red-600"
          />
        </div>
      ),
    },
  ];

  const filteredData = customerData
    ? customerData?.filter(
        (customer) =>
          customer.id.toString().includes(searchText) ||
          customer.first_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          customer.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
          `${customer.first_name} ${customer.last_name}`
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 max-w-full">
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Customers</h1>
          <p className="text-gray-600">
            Manage your customer database and loyalty program members.
          </p>
        </div>

        <div className="mb-4">
          <Search
            placeholder="Search by ID, name, or email"
            allowClear
            size="large"
            onSearch={(value) => fetchCustomerData()}
            style={{ width: 420 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm max-w-full mx-auto overflow-hidden">
          <Table
            headers={headers}
            data={filteredData}
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

export default Customers;
