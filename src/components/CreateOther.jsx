import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "antd";
import CustomInput from "@/components/common/CustomInput";
import CustomSelect from "@/components/common/CustomSelect";
import products from "@/data/products";
import promotions from "@/data/promotions";
import TableCart from "@/components/common/TableCart";
import CardPayment from "@/components/common/CardPayment";
import ModalConfirm from "@/components/common/ModalConfirm";
import formatCurrency from "@/utils/formatVND";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    cart: [],
    paymentMethod: "cash",
    amountGiven: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalValues, setModalValues] = useState({});

  const formik = useFormik({
    initialValues: {
      customerName: "",
      email: "",
      phone: "",
      product: "",
    },
    validationSchema: Yup.object({
      customerName: Yup.string().required("Tên khách hàng là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string()
        .required("Số điện thoại là bắt buộc")
        .matches(/^0[0-9]{9}$/, "Số điện thoại phải bằng 10 số"),
      product: Yup.string().required("Sản phẩm là bắt buộc"),
    }),
    onSubmit: (values) => {
      if (order.cart.length === 0) {
        return;
      }
      if (
        order.paymentMethod === "cash" &&
        order.amountGiven < calculateTotal()
      ) {
        return;
      }
      setModalValues(values);
      setIsModalVisible(true);
    },
  });

  const addProduct = (value) => {
    const productToAdd = products.find((product) => product.id === value);
    if (!productToAdd) return;

    setOrder((currentOrder) => {
      const exists = currentOrder.cart.some(
        (item) => item.id === productToAdd.id
      );

      const updatedCart = exists
        ? currentOrder.cart.map((item) =>
            item.id === productToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...currentOrder.cart, { ...productToAdd, quantity: 1, discount: 0 }];

      return { ...currentOrder, cart: updatedCart };
    });
  };
  const removeProduct = (id) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      cart: currentOrder.cart.filter((item) => item.id !== id),
    }));
    formik.setFieldValue("product", "");
  };

  const updateCart = (id, key, value) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      cart: currentOrder.cart.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      ),
    }));
  };

  const calculateTotal = () => {
    return formatCurrency(
      order.cart.reduce(
        (sum, item) => sum + (item.price - item.discount) * item.quantity,
        0
      )
    );
  };
  const calculateChange = () => {
    const amountGiven = Number(order.amountGiven) || 0;
    const total = Number(calculateTotal().replace(/[^0-9]/g, "")) || 0;
    return formatCurrency(amountGiven - total);
  };

  const applyPromo = (id) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      cart: currentOrder.cart.map((item) => {
        if (item.id === id) {
          const promo = promotions.find((p) => p.code === item.promoCode);
          let discount = 0;
          if (promo) {
            discount =
              promo.type === "percent"
                ? (item.price * promo.value) / 100
                : promo.value;
          }
          return { ...item, discount: discount || 0 };
        }
        return item;
      }),
    }));
  };

  const handleComfirmPayment = () => {
    setIsModalVisible(false);
    setOrder({
      cart: [],
      paymentMethod: "cash",
      amountGiven: 0,
    });
    formik.resetForm();
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-6 max-w-2xl  mx-auto border-[1px]  border-[#03ACF2] bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-[20px] text-[#03ACF2] text-center font-semibold mb-4">
          Tạo đơn hàng
        </h2>
        <CustomInput
          name="customerName"
          placeholder="Tên khách hàng"
          formik={formik}
          type="text"
        />
        <CustomInput
          name="email"
          formik={formik}
          placeholder="Email khách hàng"
          type="email"
        />
        <CustomInput
          name="phone"
          formik={formik}
          placeholder="Số điện thoại khách hàng"
        />
        <CustomSelect
          name="product"
          addProduct={addProduct}
          products={products}
          formik={formik}
        />

        <TableCart
          order={order}
          updateCart={updateCart}
          applyPromo={applyPromo}
          removeProduct={removeProduct}
        />
        <CardPayment
          order={order}
          setOrder={setOrder}
          calculateTotal={calculateTotal}
          calculateChange={calculateChange}
        />

        <Button
          className="mt-4 w-full bg-[#03ACF2] text-[#fff] p-5 rounded-[14px]"
          htmlType="submit"
          disabled={
            order.paymentMethod === "cash" &&
            (Number(order.amountGiven) || 0) <
              Number(calculateTotal().replace(/[^0-9]/g, ""))
          }
        >
          Thanh toán
        </Button>
        <ModalConfirm
          order={order}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          modalValues={modalValues}
          handleComfirmPayment={handleComfirmPayment}
          calculateTotal={calculateTotal}
        />
      </div>
    </form>
  );
};

export default CreateOrder;
