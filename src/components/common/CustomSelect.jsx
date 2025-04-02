import formatCurrency from "@/utils/formatVND";
import { Select } from "antd";

const CustomSelect = ({ name, addProduct, products, formik }) => {
  return (
    <div>
      <Select
        name={name}
        placeholder="Chọn sản phẩm"
        value={formik.values[name] || null}
        onChange={(value) => {
          addProduct(value);
          formik.setFieldValue(name, value);
        }}
        className="w-full rounded-[14px] text-[14px] font-Roboto  select-product-isHave "
        style={{
          borderColor:
            formik.touched[name] && formik.errors[name]
              ? "!#ff4d4f"
              : "#03ACF2",
        }}
      >
        {products.map((product) => (
          <Select.Option key={product.id} value={product.id}>
            {product.name} - {formatCurrency(product.price)}
          </Select.Option>
        ))}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-[#ff4d4f] text-[12px] ml-2 mb-1">
          {formik.errors[name]}
        </div>
      )}
    </div>
  );
};
export default CustomSelect;
