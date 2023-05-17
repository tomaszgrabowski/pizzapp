"use client";

import React from "react";
import { api } from "@/utils/api";

const KitchenPanel = () => {
  const { data, refetch } = api.orders.getOrders.useQuery("Pending");
  const { mutate } = api.orders.changeOrderStatus.useMutation();
  const handleStatusChange = async (id: string) => {
    mutate({ orderId: id, status: "Ready" });
    await refetch();
  };

  return (
    <section>
      <ul className="flex gap-2">
        {data?.map((order) => (
          <li key={order.id} className="flex flex-col p-2">
            <h2>Order #{order.id}</h2>
            <p>Table: {order.table?.name}</p>
            <hr />
            <ul>
              {order.DishOnOrder.map((dishOnOrder) => (
                <li key={dishOnOrder.id}>
                  {dishOnOrder.quantity}x {dishOnOrder.dish.name}
                </li>
              ))}
            </ul>
            <button
              className="p2 bg-blue-200"
              onClick={() => handleStatusChange(order.id)}
            >
              Mark ready
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default KitchenPanel;
