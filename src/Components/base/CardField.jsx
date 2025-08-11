import { Switch } from "antd";
import { TfiMenuAlt } from "react-icons/tfi";

import React from "react";

function CardField({ label, value, setValue, disabled }) {
  return (
    <div
      class={`w-full p-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }  border px-4 border-gray-300 rounded-xl flex justify-between items-center`}
    >
      <div class="flex items-center gap-2">
        <TfiMenuAlt />
        <div class="text-sm font-medium text-gray-500">{label}</div>
      </div>
      <Switch disabled={disabled} checked={value} onChange={setValue} />
    </div>
  );
}

export default CardField;
