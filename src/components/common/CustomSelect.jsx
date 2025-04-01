import { Select } from "antd";
import React from "react";

const CustomSelect = ({ name, addProduct, products, error }) => {
  return (
    <div>
      <Select
        name={name}
        placeholder="Chọn sản phẩm"
        onChange={addProduct}
        className={`text-[16px] h-[46px] ${"select-product-isHave"}`}
      >
        {products.map((product) => (
          <Select.Option key={product.id} value={product.id}>
            {product.name} - ${product.price}
          </Select.Option>
        ))}
      </Select>
      {error && (
        <div className="text-[#ff4d4f] text-[12px] ml-2 mb-1">{error}</div>
      )}
    </div>
  );
};

export default CustomSelect;
