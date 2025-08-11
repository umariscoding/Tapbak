import React, { useState } from 'react';
import Table from '../../Components/Table';
import { Input } from 'antd';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../../Components/base/Button';

const { Search } = Input;

function Customers() {
  const [searchText, setSearchText] = useState('');

  const customerData = [
    {
      id: 'CUST001',
      name: 'Alice Smith',
      email: 'alice.s@example.com',
      points: 1250,
      joinDate: '2024-01-15',
      updatedAt: '2024-07-28',
      status: 'active'
    },
    {
      id: 'CUST002',
      name: 'Bob Johnson',
      email: 'bob.j@example.com',
      points: 3400,
      joinDate: '2024-02-01',
      updatedAt: '2024-07-29',
      status: 'vip'
    },
    {
      id: 'CUST003',
      name: 'Charlie Brown',
      email: 'charlie.b@example.com',
      points: 500,
      joinDate: '2023-12-10',
      updatedAt: '2024-07-20',
      status: 'inactive'
    },
    {
      id: 'CUST004',
      name: 'Diana Prince',
      email: 'diana.p@example.com',
      points: 780,
      joinDate: '2024-03-05',
      updatedAt: '2024-07-27',
      status: 'active'
    },
    {
      id: 'CUST005',
      name: 'Eve Adams',
      email: 'eve.a@example.com',
      points: 100,
      joinDate: '2024-07-20',
      updatedAt: '2024-07-25',
      status: 'new'
    },
    {
      id: 'CUST006',
      name: 'Frank White',
      email: 'frank.w@example.com',
            points: 2100,
      joinDate: '2024-01-30',
      updatedAt: '2024-07-26',
      status: 'vip'
    }
  ];

  const headers = [
    { label: 'Customer ID', key: 'id', width: '15%' },
    { label: 'Name', key: 'name', width: '15%' },
    { label: 'Email', key: 'email', width: '20%', ellipsis: true },
    { 
      label: 'Loyalty Points', 
      key: 'points', 
      width: '15%',
      align: 'center',
      render: (value) => (
        <div className="text-center">
          <span className="text-blue-600 font-medium">
            {value.toLocaleString()}
          </span>
        </div>
      )
    },
    { 
      label: 'Joined Date', 
      key: 'joinDate', 
      width: '12%', 
      render: (date) => new Date(date).toLocaleDateString() 
    },
    { 
      label: 'Updated At', 
      key: 'updatedAt', 
      width: '12%', 
      render: (date) => new Date(date).toLocaleDateString() 
    },
    {
      label: 'Actions',
      key: 'actions',
      width: '10%',
      render: (_, record) => (
        <div className="flex gap-3">
          <Button 
            variant="text"
            size="small"
            startIcon={<FiEdit2 size={18} />}
            onClick={(e) => { e.stopPropagation(); }}
          />
          <Button 
            variant="text"
            size="small"
            startIcon={<FiTrash2 size={18} />}
            onClick={(e) => { e.stopPropagation(); }}
            className="text-gray-600 hover:text-red-600"
          />
        </div>
      )
    }
  ];

  const filteredData = customerData.filter((customer) =>
    customer.id.toString().includes(searchText) ||
    customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 max-w-full">
      <div className='max-w-full'>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Customers</h1>
          <p className="text-gray-600">Manage your customer database and loyalty program members.</p>
        </div>

        <div className="mb-4">
          <Search
            placeholder="Search by ID, name, or email"
            allowClear
            size="large"
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

export default Customers;