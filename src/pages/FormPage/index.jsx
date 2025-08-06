import React, { useState } from "react";
import { addToWalletHandler } from "../../states/app";
import { useParams } from "react-router-dom";

function FormPage() {

  const [name, setName]  = useState("");
  const [email, setEmail]  = useState("");
  const [phone, setPhone]  = useState("");
  const [loading, setLoading] = useState(false);
  const { vendorName } = useParams();
  console.log(vendorName);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await addToWalletHandler(name, email, phone, vendorName);
    } catch (error) {
      console.error("Error adding to wallet:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-3xl font-semibold mb-6 text-center">
          Subscribe to {vendorName || "John Coffee Shop"} Loyalty Program!
        </div>
        <div className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value = {name}
              onChange = {(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value = {email}
              onChange = {(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your phone number"
              value = {phone}
              onChange = {(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            onClick = {handleSubmit}
            className="bg-green-800 text-white flex items-center justify-center w-full p-4 rounded-xl font-medium"
          >
            {loading ? "Adding..." : "Add to Apple Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
