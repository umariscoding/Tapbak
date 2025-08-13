import React, { useState } from 'react';
import Modal from './base/Modal';
import TextField from './base/TextField';

function PointsManagementModal({ isOpen, onClose, mode = 'update' }) {
  const [formData, setFormData] = useState({
    customerId: '',
    amount: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'update' ? 'Update Points' : 'Redeem Points'}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          label="Customer ID"
          value={formData.customerId}
          onChange={(e) => handleChange('customerId', e.target.value)}
          placeholder="Enter customer ID"
          required
        />
        <TextField
          label={mode === 'update' ? 'Transaction Amount ($)' : 'Points to Redeem'}
          value={formData.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
          placeholder={mode === 'update' ? "Enter transaction amount" : "Enter points to redeem"}
          type="number"
          min="0"
          required
        />
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
              mode === 'update'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {mode === 'update' ? 'Update Points' : 'Redeem Points'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PointsManagementModal;
