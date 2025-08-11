import React, { useState } from "react";
import logo from "../../../public/signup.jpg";
import TextField from "../../Components/base/TextField";
import { createVendor } from "../../states/app";

function Auth() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    businessTagline: "",
  })

  const onSubmit = async () => {
    try {
      const res = await createVendor(data);
      console.log(res);
    } catch (error) {
      console.log(error);
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
          <TextField label="Name" placeholder="Enter your name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
          <TextField label="Email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <TextField label="Password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
          <TextField
            label="Confirm Password"
            placeholder="Enter your password"
          />
          <TextField
            label="Business Name"
            placeholder="Enter your business name"
            value={data.businessName}
            onChange={(e) => setData({ ...data, businessName: e.target.value })}
          />
          <TextField
            label="Business Tagline"
            placeholder="Enter your business tagline"
            value={data.businessTagline}
            onChange={(e) => setData({ ...data, businessTagline: e.target.value })}
          />
        </div>
        <button
          onClick={onSubmit}
          className="bg-blue-500 my-2 w-full text-white p-2 rounded-md"
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Auth;
