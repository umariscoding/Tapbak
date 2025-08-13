import React, { useState } from "react";
import logo from "../../../public/signup.jpg";
import TextField from "../../Components/base/TextField";
import { useNavigate } from "react-router-dom";
import { loginVendor } from "../../states/app";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      loginVendor(data).then((data) => {
        if (data.message === "Login successful") {
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
      alert('Login failed. Please try again.');
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
          />
          <TextField
            label="Password"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
          />
        </div>
        
        <button
          onClick={onSubmit}
          disabled={!isFormValid() || isLoading}
          className={`my-2 w-full p-2 rounded-md transition-all duration-200 ${
            !isFormValid() || isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'
          } text-white`}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

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
