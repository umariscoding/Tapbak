import React, { useState } from "react";
import logo from "../../../public/signup.jpg";
import TextField from "../../Components/base/TextField";
import { useNavigate } from "react-router-dom";
import { loginVendor } from "../../states/app";
import { showSuccess, showError, showInfo } from "../../utils/toast";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setData({
      email: "",
      password: "",
    });
  };

  const onSubmit = async () => {
    if (!isFormValid()) {
      showError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginVendor(data);
      if (response.message === "Login successful") {
        showSuccess("Login successful! Redirecting to dashboard...");
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        showError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      showError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return data.email.trim() && data.password.trim();
  };

  return (
    <div className="flex h-screen items-center justify-center gap-10">
      <div className="rounded-xl overflow-hidden h-fit">
        <img src={logo} alt="logo" className="h-96 shadow-xl object-cover" />
      </div>
      <div className="flex text-center max-w-1/2 flex-col gap-2">
        <div className="text-4xl font-medium">Tapbak</div>
        <div className="text-2xl font-medium">Vendor Login</div>
        <div className="text-sm">
          Access your loyalty program management dashboard.
        </div>

        <div className="flex flex-col gap-5">
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
            {isLoading ? 'Logging in...' : 'Login'}
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
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
