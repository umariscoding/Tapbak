import React, { useState } from "react";
import logo from "../../../public/signup.jpg";
import TextField from "../../Components/base/TextField";
import { createVendor } from "../../states/app";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showInfo } from "../../utils/toast";

function Auth() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessTagline: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessTagline: "",
    });
  };

  const isFormValid = () => {
    return (
      data.name.trim() &&
      data.email.trim() &&
      data.password.trim() &&
      data.confirmPassword.trim() &&
      data.businessName.trim() &&
      data.password === data.confirmPassword &&
      data.password.length >= 6
    );
  };

  const onSubmit = async () => {
    if (!isFormValid()) {
      if (data.password !== data.confirmPassword) {
        showError("Passwords do not match");
        return;
      }
      if (data.password.length < 6) {
        showError("Password must be at least 6 characters long");
        return;
      }
      showError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await createVendor(data);
      if (response.email) {
        showSuccess("Account created successfully! Redirecting to login...");
        resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showError("Failed to create account. Please try again.");
      }
    } catch (error) {
      console.log(error);
      showError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <div className="rounded-xl overflow-hidden h-fit ">
        <img src={logo} alt="logo" className="h-96 shadow-xl object-cover" />
      </div>
      <div className="flex text-center max-w-1/2 flex-col gap-2">
        <div className="text-4xl font-medium">Tapbak</div>
        <div className="text-2xl font-medium">Vendor Signup</div>
        <div className="text-sm ">
          Access your loyalty program management dashboard.
        </div>

        <div className="grid grid-cols-2 gap-5">
          <TextField
            label="Name"
            placeholder="Enter your name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            type="email"
            required
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            required
          />
          <TextField
            label="Confirm Password"
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            type="password"
            required
          />
          <TextField
            label="Business Name"
            placeholder="Enter your business name"
            value={data.businessName}
            onChange={(e) => setData({ ...data, businessName: e.target.value })}
            required
          />
          <TextField
            label="Business Tagline"
            placeholder="Enter your business tagline"
            value={data.businessTagline}
            onChange={(e) =>
              setData({ ...data, businessTagline: e.target.value })
            }
            required
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onSubmit}
            disabled={!isFormValid() || isLoading}
            className={`flex-1 p-2 rounded-md transition-all duration-200 ${
              !isFormValid() || isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'
            } text-white`}
          >
            {isLoading ? 'Creating Account...' : 'Signup'}
          </button>
          
          <button
            onClick={resetForm}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            Reset
          </button>
        </div>

        <div className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
