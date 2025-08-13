import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../../Components/base/TextField';
import addToWalletSvg from '../../../public/add-to-wallet.svg';

function CustomerForm() {
  const { vendorSlug } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [vendorName, setVendorName] = useState('');

  useEffect(() => {
    setVendorName('Superstar Coffee Shop');
  }, [vendorSlug]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', {
        vendorSlug,
        vendorName,
        customerData: formData
      });
      
      alert('Customer registered successfully!');
      navigate('/customers');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error registering customer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.phoneNumber.trim() && 
           formData.email.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Join {vendorName}
          </h1>
          <p className="text-gray-600">
            Enter your details to join our loyalty program
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
            <TextField
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>

          <TextField
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            type="tel"
            required
          />

          <TextField
            label="Email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            type="email"
            required
          />

          {/* Add to Wallet SVG Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className={`transition-opacity duration-200 ${(!isFormValid() || isLoading) ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:opacity-80'}`}
            >
              <img 
                src={addToWalletSvg} 
                alt="Add to Wallet" 
                className="w-32 h-auto"
              />
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By joining, you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
