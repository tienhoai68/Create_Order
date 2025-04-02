import formatCurrency from "@/utils/formatVND";
import { Card, Input, Radio } from "antd";
import React from "react";

const CardPayment = ({ order, setOrder, calculateTotal, calculateChange }) => {
  return (
    <Card className="mt-4 p-2 bg-white shadow-lg rounded-2xl border border-gray-200">
      <p className="font-semibold text-lg text-gray-800">
        Tổng tiền:{" "}
        <span className="text-green-500 font-bold text-[20px]">
          {calculateTotal()}
        </span>
      </p>
      <Radio.Group
        className="mt-3"
        value={order.paymentMethod}
        onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })}
      >
        <Radio value="cash">Tiền mặt</Radio>
        <Radio value="card">Thẻ</Radio>
      </Radio.Group>

      {order?.paymentMethod === "cash" && (
        <div className="mt-3">
          <Input
            type="number"
            placeholder="Số tiền khách đưa"
            value={order.amountGiven}
            className="w-full rounded-[14px] text-[14px] font-Roboto mb-2 py-[8px] border-[#03ACF2] text-[#03ACF2]"
            onChange={(e) =>
              setOrder({
                ...order,
                amountGiven: Number(e.target.value) || 0,
              })
            }
          />
          {calculateChange() > formatCurrency(0) && (
            <p className="mt-2 text-green-600 font-semibold">
              Tiền thừa trả khách: {calculateChange()}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default CardPayment;
