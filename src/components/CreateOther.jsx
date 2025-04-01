import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Select,
  Card,
  Radio,
  Button,
  Modal,
  Table,
  message,
  Input,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";

const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
  { id: 3, name: "Tablet", price: 300 },
];

const CreateOrder = () => {
  const [order, setOrder] = useState({
    cart: [],
    paymentMethod: "cash",
    givenAmount: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({});

  const formik = useFormik({
    initialValues: {
      customerName: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Tên khách hàng là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string().required("Số điện thoại là bắt buộc"),
      products: Yup.array().required("Sản phẩm là bắt buộc"),
    }),
    onSubmit: (values) => {
      if (order.cart.length === 0) {
        message.error("Vui lòng chọn sản phẩm");
        return;
      }
      setModalValues(values);
      setIsModalVisible(true);
    },
  });

  const addProduct = (value) => {
    const product = products.find((p) => p.id === value);
    if (product) {
      setOrder((prev) => ({
        ...prev,
        cart: [...prev.cart, { ...product, quantity: 1, discount: 0 }],
      }));
    }
  };

  const removeProduct = (id) => {
    setOrder((prev) => ({
      ...prev,
      cart: prev.cart.filter((item) => item.id !== id),
    }));
  };

  const updateCart = (id, key, value) => {
    setOrder((prev) => ({
      ...prev,
      cart: prev.cart.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const calculateTotal = () => {
    return order.cart.reduce(
      (sum, item) => sum + (item.price - item.discount) * item.quantity,
      0
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-[20px] text-[#03ACF2] text-center font-semibold mb-4">
          Tạo đơn hàng
        </h2>
        <CustomInput
          name="customerName"
          placeholder="Tên khách hàng"
          value={formik.values.customerName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.customerName && formik.errors.customerName}
        />
        <CustomInput
          name="email"
          placeholder="Email khách hàng"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        />
        <CustomInput
          name="phone"
          placeholder="Số điện thoại khách hàng"
          value={formik.values.phone}
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur}
          error={formik.touched.phone && formik.errors.phone}
        />
        <CustomSelect
          name="product"
          addProduct={addProduct}
          products={products}
          error={formik.errors.product}
        />
        {/* <Select
          placeholder="Chọn sản phẩm"
          className="w-full mb-2"
          onChange={addProduct}
          
        >
          {products.map((product) => (
            <Select.Option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </Select.Option>
          ))}
        </Select> */}

        <Table
          dataSource={order.cart}
          rowKey="id"
          columns={[
            { title: "Sản phẩm", dataIndex: "name" },
            {
              title: "Số lượng",
              dataIndex: "quantity",
              render: (text, record) => (
                <Input
                  type="number"
                  min={1}
                  value={record.quantity}
                  onChange={(e) =>
                    updateCart(record.id, "quantity", Number(e.target.value))
                  }
                />
              ),
            },
            {
              title: "Thao tác",
              render: (text, record) => (
                <Button onClick={() => removeProduct(record.id)} danger>
                  <DeleteOutlined />
                </Button>
              ),
            },
          ]}
        />

        <Card className="mt-4 p-4 bg-gray-100">
          <p className="font-semibold">Tổng tiền: ${calculateTotal()}</p>
        </Card>
        <Button type="primary" className="mt-4 w-full" htmlType="submit">
          Thanh toán
        </Button>

        <Modal
          title="Xác nhận đơn hàng"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <p>Tên khách hàng: {modalValues.customerName}</p>
          <p>Email: {modalValues.email}</p>
          <p>Số điện thoại: {modalValues.phone}</p>
          <p>Tổng tiền: ${calculateTotal()}</p>
        </Modal>
      </div>
    </form>
  );
};

export default CreateOrder;
