import React, { useState } from 'react';
import Table from '../../Components/Table';
import { Input } from 'antd';
import Button from '../../Components/base/Button';
import { FiPlusCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const transactionData = [
  {
    id: 'TXN001',
    date: '2024-07-20',
    customerName: 'Alice Johnson',
    pointsChange: 150,
    paymentReceived: 25.00,
    type: 'Earned'
  },
  {
    id: 'TXN002',
    date: '2024-07-19',
    customerName: 'Bob Williams',
    pointsChange: -200,
    paymentReceived: 0,
    type: 'Redeemed'
  },
  {
    id: 'TXN003',
    date: '2024-07-18',
    customerName: 'Alice Johnson',
    pointsChange: 50,
    paymentReceived: 10.00,
    type: 'Earned'
  },
  {
    id: 'TXN004',
    date: '2024-07-17',
    customerName: 'Charlie Brown',
    pointsChange: 75,
    paymentReceived: 15.00,
    type: 'Earned'
  },
  {
    id: 'TXN005',
    date: '2024-07-16',
    customerName: 'Diana Prince',
    pointsChange: 100,
    paymentReceived: 20.00,
    type: 'Earned'
  }
];

function Transactions() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const headers = [
    { 
      label: 'Transaction ID', 
      key: 'id', 
      width: '15%' 
    },
    { 
      label: 'Date', 
      key: 'date', 
      width: '15%',
      render: (date) => new Date(date).toLocaleDateString()
    },
    { 
      label: 'Customer Name', 
      key: 'customerName', 
      width: '25%' 
    },
    { 
      label: 'Points Change', 
      key: 'pointsChange', 
      width: '20%',
      align: 'center',
      render: (value) => (
        <div className={`text-center ${value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="font-medium">
            {value > 0 ? `+${value}` : value}
          </span>
        </div>
      )
    },
    { 
      label: 'Payment Received', 
      key: 'paymentReceived', 
      width: '15%',
      align: 'right',
      render: (value) => (
        <div className="text-right">
          <span className="font-medium">
            ${value.toFixed(2)}
          </span>
        </div>
      )
    }
  ];

  const filteredData = transactionData.filter((transaction) =>
    transaction.id.toLowerCase().includes(searchText.toLowerCase()) ||
    transaction.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 max-w-full">
      <div className="max-w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Transaction History</h1>
          <p className="text-gray-600">Detailed record of all loyalty points transactions.</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <Search
            placeholder="Search by transaction ID or customer name"
            allowClear
            size="large"
            style={{ width: 420 }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="primary"
            startIcon={<FiPlusCircle />}
            onClick={() => navigate('/process')}
          >
            New Transaction
          </Button>
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
              showTotal: (total, range) => `Page ${range[0]}-${range[1]} of ${total}`,
              className: "px-4 py-3 border-t"
            }}
            style={{ overflowX: 'auto' }}
            className="cursor-pointer hover:bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
