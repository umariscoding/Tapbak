import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../Components/base/TextField";
import Button from "../../Components/base/Button";
import { FiSearch, FiDollarSign, FiRefreshCcw, FiGift } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { fetchCustomerData, processTransaction } from "../../states/app";
import { showSuccess, showError, showInfo } from "../../utils/toast";

function ProcessTransaction() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState(searchParams.get("customer_id"));
  const [customer, setCustomer] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [remainingPoints, setRemainingPoints] = useState("");
  const [transactionPoints, setTransactionPoints] = useState(0);
  const [transactionType, setTransactionType] = useState("points");
  const [step, setStep] = useState("search");;
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setCustomerId("");
    setCustomer(null);
    setTransactionAmount("");
    setRemainingPoints("");
    setTransactionPoints(0);
    setStep("search");
  };

  const fetchCustomer = async () => {
    try {
      setIsLoading(true);
      const customer = await fetchCustomerData(customerId);
      setCustomer(customer.customer);
      setRemainingPoints(customer.customer?.loyalty_card?.loyalty_points);
    } catch (error) {
      console.error("Failed to fetch customer:", error);
      showError("Failed to fetch customer. Please check the customer ID.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) {
      fetchCustomer();
      setStep("details");
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (customerId) {
      await fetchCustomer();
      setStep("details");
    } else {
      showError("Please enter a customer ID");
    }
  };

  const handleProcess = async () => {
    if (!transactionAmount || !transactionPoints) {
      showError("Please fill in all required fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await processTransaction(
        customerId,
        transactionType,
        transactionAmount,
        transactionPoints
      );
      
      showSuccess("Transaction processed successfully!")
      setTimeout(() => {
        navigate("/transactions");
      }, 1500);
      
    } catch (error) {
      console.error("Failed to process transaction:", error);
      showError("Failed to process transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Process Transaction
        </h1>
        <p className="text-gray-600">
          Process payments and manage loyalty points
        </p>
      </div>

      {step === "search" && (
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
              disabled={isLoading}
            >
              {isLoading ? "Finding..." : "Find Customer"}
            </Button>
          </form>
        </div>
      )}

      {step === "details" && customer && (
        <div className="space-y-6">
          {/* Customer Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {customer.first_name} {customer.last_name}
                </h2>
                <p className="text-gray-600">{customer.email}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Customer ID</div>
                <div className="font-medium">{customer.id}</div>
              </div>
            </div>

            {/* View Rewards Button */}
            <div className="mb-4">
              <Button
                variant="secondary"
                startIcon={<FiGift />}
                className="mb-4"
              >
                View Customer Rewards
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Available Points</div>
                <div className="text-2xl font-semibold text-blue-600">
                  {customer?.loyalty_card?.loyalty_points}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Join Date</div>
                <div className="text-lg font-medium">
                  {new Date(customer.created_at).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Status</div>
                <div className="text-lg font-medium capitalize">
                  {customer.status}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Recent Transactions</h3>
              <div className="space-y-2">
                {/* {customer.recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div className="text-gray-600">${transaction.amount}</div>
                    <div className="text-blue-600">+{transaction.points} points</div>
                  </div>
                ))} */}
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
                label={`${
                  transactionType === "points"
                    ? "Points to Add/Deduct"
                    : "Amount to Add/Deduct"
                }`}
                value={transactionPoints}
                onChange={(e) => setTransactionPoints(e.target.value)}
                type="number"
                min="0"
                max={remainingPoints}
                placeholder={`Enter ${
                  transactionType === "points" ? "points" : "amount"
                } to add/deduct`}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  variant="primary"
                  onClick={handleProcess}
                  startIcon={<FiDollarSign />}
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Process Transaction"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={resetForm}
                  startIcon={<FiRefreshCcw />}
                  disabled={isLoading}
                >
                  Reset
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
