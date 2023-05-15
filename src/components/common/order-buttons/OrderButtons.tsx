"use client";

import React from "react";
import { api } from "@/utils/api";
import { useCart } from "react-use-cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTable } from "@/components/common/table-provider/TableProvider";

const OrderButtons = () => {
  const { items, emptyCart } = useCart();
  const { data } = useSession();
  const { push } = useRouter();
  const { tableId } = useTable();

  const mutation = api.orders.insertOrder.useMutation();
  const handlePlaceOrder = () => {
    if (tableId && items.length > 0 && data?.user) {
      mutation.mutate({
        tableId,
        status: "In progress",
        dishes: items.map((item) => ({
          dishId: item.id,
          quantity: item.quantity ?? 1,
        })),
      });
      emptyCart();
    }
  };

  const clearCart = () => {
    emptyCart();
  };
  const navigateToLogin = () => {
    push("/auth/login");
  };
  return (
    <section className="flex flex-col gap-2">
      {data?.user && (
        <button className="bg-blue-200 p-2" onClick={handlePlaceOrder}>
          place order
        </button>
      )}
      {!data?.user && (
        <button className="bg-blue-200 p-2" onClick={navigateToLogin}>
          Login to place order
        </button>
      )}
      <button className="bg-blue-200 p-2" onClick={clearCart}>
        Clear cart
      </button>
    </section>
  );
};

export default OrderButtons;
