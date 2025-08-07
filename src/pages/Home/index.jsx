import React, { useEffect, useState } from "react";
import { getFieldDefinitions } from "../../states/app";
import { FaPlus } from "react-icons/fa";

function Home() {
  const [fieldDefinitions, setFieldDefinitions] = useState([]);
  const [templateFields, setTemplateFields] = useState([]);
  useEffect(() => {
    getFieldDefinitions().then((res) => {
      setFieldDefinitions(res);
    });
  }, []);

  return (
    <div className="p-4">
      <div className="text-2xl font-semibold">Field Definitions</div>
      <div>
        <h2>Create New Pass Template</h2>
        <div className=" cursor-pointer hover:bg-slate-200 transition-all duration-300 flex p-3 items-center justify-center bg-slate-100 rounded-md w-64 h-48 shadow-md">
          <div className="flex flex-col items-center justify-center gap-2">
            <FaPlus size={30} />

            <p className="text-sm">Create New Pass Template</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
