import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../../Components/base/TextField';
import { getPublicVendor, addToWalletHandler } from '../../states/app';
import { showSuccess, showError, showInfo } from '../../utils/toast';
import addToWalletSvg from '../../../public/add-to-wallet.svg';

function CustomerForm() {
  const { vendor_id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    dateOfBirth: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [vendorError, setVendorError] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const vendor = await getPublicVendor(vendor_id);
        if (!vendor || !vendor.business_name) {
          setVendorError('Vendor not found. Please check the link or contact the business.');
          return;
        }
        setVendorName(vendor.business_name);
        showInfo(`Welcome to ${vendor.business_name}'s loyalty program!`);
      } catch (error) {
        setVendorError('Vendor not found. Please check the link or contact the business.');
        showError('Failed to load vendor information');
      }
    };
    fetchVendor();
  }, [vendor_id]);

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      dateOfBirth: '',
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      showError('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await addToWalletHandler(
        formData.firstName, 
        formData.lastName, 
        formData.email, 
        formData.contactNumber, 
        vendor_id, 
        formData.dateOfBirth
      );
      
      showSuccess('Successfully joined the loyalty program!');
      
      // Reset form after successful submission
      resetForm();
      
      // Navigate to success page or show success message
      setTimeout(() => {
        showInfo('You can now close this page. Your loyalty card has been added to your wallet.');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      showError('Error registering customer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.firstName.trim() && 
           formData.lastName.trim() && 
           formData.contactNumber.trim() && 
           formData.email.trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {vendorError ? 'Vendor not found' : `Join ${vendorName || '...'}`}
          </h1>
          <p className="text-gray-600">
            {vendorError ? 'The link you followed is invalid or the business is unavailable.' : 'Enter your details to join our loyalty program'}
          </p>
        </div>

        {/* Vendor not found message or Form */}
        {vendorError ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {vendorError}
          </div>
        ) : (
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
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
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

            <TextField
              label="Date of Birth"
              placeholder="Select your date of birth"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              type="date"
            />

            <div className="flex justify-center space-x-4">
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
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                Reset
              </button>
            </div>
          </form>
        )}

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
