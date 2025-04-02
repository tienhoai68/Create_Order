import React from "react";
import { Modal, Button, Typography, Divider } from "antd";

const { Text, Title } = Typography;
const ModalConfirm = ({
  order,
  isModalVisible,
  setIsModalVisible,
  modalValues,
  calculateTotal,
  handleComfirmPayment,
}) => {
  return (
    <Modal
      title={
        <Title className="text-[#03ACF2]" level={4}>
          Xác nhận đơn hàng
        </Title>
      }
      open={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={null}
      centered
    >
      <div className="space-y-6">
        <Text strong>Tên khách hàng:</Text>{" "}
        <Text>{modalValues.customerName}</Text>
        <Divider />
        <Text strong>Email:</Text> <Text>{modalValues.email}</Text>
        <Divider />
        <Text strong>Số điện thoại:</Text> <Text>{modalValues.phone}</Text>
        <Divider />
        <Text strong>Phương thức thanh toán:</Text>{" "}
        <Text>{order.paymentMethod === "cash" ? "Tiền mặt" : "Thẻ"}</Text>
        <Divider />
        <Text strong>Tổng tiền:</Text>{" "}
        <Text type="danger" strong>
          {calculateTotal()} VNĐ
        </Text>
      </div>

      <Button
        className="mt-4 w-full bg-[#03ACF2] text-[#fff] p-5 rounded-[14px]"
        onClick={() => handleComfirmPayment()}
      >
        Xác nhận
      </Button>
    </Modal>
  );
};

export default ModalConfirm;
