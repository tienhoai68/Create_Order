import React from "react";
import { Input } from "antd";

const CustomInput = ({ name, placeholder, type, formik }) => {
  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        value={formik.values[name]}
        type={type}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={formik.handleBlur}
        className={`w-full rounded-[14px] text-[14px] font-Roboto mb-2 py-[8px] ${
          formik.touched[name] && formik.errors[name]
            ? "border-[#ff4d4f]"
            : "border-[#03ACF2] text-[#03ACF2]"
        }`}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-[#ff4d4f] text-[12px] ml-2 mb-1">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
