import React from "react";
import { Input } from "antd";

const CustomInput = ({ name, placeholder, value, onChange, onBlur, error }) => {
  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border-grayColor w-full rounded-[14px] text-[14px] font-Roboto mb-2 py-[8px] ${
          error ? "border-red" : "border-[#03ACF2] text-[#03ACF2]"
        }`}
      />
      {error && (
        <div className="text-[#ff4d4f] text-[12px] ml-2 mb-1">{error}</div>
      )}
    </div>
  );
};

export default CustomInput;
