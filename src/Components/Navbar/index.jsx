import React from "react";
import { FaStore, FaQrcode } from "react-icons/fa";
import { useUser } from "../../states/contexts/User";
import { useNavigate } from "react-router-dom";
import Button from "../base/Button";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleVisitForm = () => {
    const vendorId = user?.id || user?.vendor_id || user?._id || user?.uuid;
    
    if (vendorId) {
      window.open(`/join/${vendorId}`, '_blank');
    } else {
      console.error("Vendor ID not found in user object");
    }
  };

  return (
    <div className="flex flex-col justify-between items-center p-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold text-blue-600">Tapbak</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={handleVisitForm}
            variant="outline"
            className="flex items-center gap-2 px-3 py-2"
          >
            <FaQrcode />
            Visit Form
          </Button>
          <div className="flex font-medium gap-2 items-center">
            <FaStore /> {user?.business_name || "No Business Name"}
          </div>
        </div>
      </div>
      <div className="h-[1px] mt-1 w-full bg-gray-200"></div>
    </div>
  );
}

export default Navbar;
