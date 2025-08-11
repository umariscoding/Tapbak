import React, { useState } from 'react';
import TextField from '../../Components/base/TextField';
import Button from '../../Components/base/Button';
import { FiSearch, FiDollarSign, FiRefreshCcw } from 'react-icons/fi';

function ProcessTransaction() {
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState('');
  const [step, setStep] = useState('search'); // search, details, process

  // Mock customer data - replace with actual API call
  const fetchCustomer = () => {
    // Simulating API call
    const mockCustomer = {
      id: customerId,
      name: 'Alice Smith',
      email: 'alice.s@example.com',
      points: 1250,
      status: 'active',
      joinDate: '2024-01-15',
      recentTransactions: [
        { date: '2024-02-10', amount: 50, points: 150 },
        { date: '2024-02-05', amount: 30, points: 90 }
      ]
    };
    setCustomer(mockCustomer);
    setStep('details');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (customerId) {
      fetchCustomer();
    }
  };

  const handleProcess = () => {
    // Handle transaction processing
    console.log('Processing transaction:', {
      customerId,
      transactionAmount,
      pointsToRedeem
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Process Transaction</h1>
        <p className="text-gray-600">Process payments and manage loyalty points</p>
      </div>

      {step === 'search' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSearch} className="max-w-md">
            <TextField
              label="Customer ID"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter customer ID"
              required
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              startIcon={<FiSearch />}
              className="mt-4"
            >
              Find Customer
            </Button>
          </form>
        </div>
      )}

      {step === 'details' && customer && (
        <div className="space-y-6">
          {/* Customer Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{customer.name}</h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Customer ID</div>
                <div className="font-medium">{customer.id}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Available Points</div>
                <div className="text-2xl font-semibold text-blue-600">{customer.points}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Join Date</div>
                <div className="text-lg font-medium">{new Date(customer.joinDate).toLocaleDateString()}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Status</div>
                <div className="text-lg font-medium capitalize">{customer.status}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {customer.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className="text-gray-600">${transaction.amount}</div>
                    <div className="text-blue-600">+{transaction.points} points</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction Processing Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold mb-4">Process Transaction</h3>
            <div className="space-y-4">
              <TextField
                label="Transaction Amount ($)"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                type="number"
                min="0"
                placeholder="Enter amount"
              />
              <TextField
                label="Points to Redeem"
                value={pointsToRedeem}
                onChange={(e) => setPointsToRedeem(e.target.value)}
                type="number"
                min="0"
                max={customer.points}
                placeholder="Enter points to redeem"
              />
              <div className="flex gap-3 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => setStep('search')}
                  startIcon={<FiRefreshCcw />}
                  fullWidth
                >
                  New Customer
                </Button>
                <Button
                  variant="primary"
                  onClick={handleProcess}
                  startIcon={<FiDollarSign />}
                  fullWidth
                >
                  Process Transaction
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcessTransaction;
