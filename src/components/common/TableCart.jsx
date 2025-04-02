import promotions from "@/data/promotions";
import { Button, Input, Select, Table } from "antd";
import React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import formatCurrency from "@/utils/formatVND";

const TableCart = ({ order, updateCart, applyPromo, removeProduct }) => {
  return (
    <Table
      dataSource={order.cart}
      rowKey="id"
      columns={[
        { title: "Sản phẩm", dataIndex: "name" },
        {
          title: "Đơn giá",
          dataIndex: "price",
          render: (price) => formatCurrency(price),
        },
        {
          title: "Số lượng",
          dataIndex: "quantity",
          render: (text, record) => (
            <Input
              className="w-fit"
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
          title: "Mã khuyến mãi",
          render: (text, record) => (
            <Select
              placeholder="Nhập mã"
              value={record.promoCode || ""}
              className="w-full rounded-[14px] text-[14px] font-Roboto "
              onChange={(value) => {
                updateCart(record.id, "promoCode", value);
                applyPromo(record.id);
              }}
              onBlur={() => applyPromo(record.id)}
            >
              {promotions.map((promotion) => (
                <Select.Option key={promotion.id} value={promotion.code}>
                  {promotion.code}
                </Select.Option>
              ))}
            </Select>
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
  );
};

export default TableCart;
