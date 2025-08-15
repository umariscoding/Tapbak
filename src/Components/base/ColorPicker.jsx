import React, { useState } from "react";
import { ColorPicker } from "antd";

function ColorBox({ label, color, setColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">{label}</div>
      <ColorPicker
        className="max-h-24"
        value={color}
        style={{
          width: "2rem",
          height: "2rem",
        }}
        open={open}
        onOpenChange={setOpen}
        onChange={(color) => setColor(color.toHexString())}
      />
    </div>
  );
}

export default ColorBox;
