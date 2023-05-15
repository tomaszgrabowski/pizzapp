"use client";

import React, { FC } from "react";
import { Item, useCart } from "react-use-cart";
import { Dish } from ".prisma/client";
import OrderButtons from "@/components/common/order-buttons/OrderButtons";

const Cart = () => {
  const { items } = useCart();
  return (
    <>
      <ul className="flex flex-col flex-wrap">
        {items.map((item) => (
          <li key={item.id} className="m-2 flex flex-col border">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <OrderButtons />
    </>
  );
};

export default Cart;

const CartItem: FC<{ item: Item }> = ({ item }) => {
  const { handleRemove, handleRemoveItemCompletely, handleAddItem } =
    useCartItem(item);
  return (
    <>
      {item.name} - {item.quantity}
      <div onClick={handleRemove}>-</div>
      <div onClick={handleAddItem}>+</div>
      <div onClick={handleRemoveItemCompletely}>Remove</div>
    </>
  );
};

export const useCartItem = (item: Item) => {
  const { updateItem, removeItem, getItem, addItem } = useCart();

  const handleRemove = () => {
    const _item = getItem(item.id) as Dish & { quantity: number };
    const _quantity = _item.quantity ?? 0;
    if (_quantity > 0) {
      updateItem(_item.id, { quantity: _quantity - 1 });
    }
  };

  const handleRemoveItemCompletely = () => {
    removeItem(item.id);
  };

  const itemsInCart = getItem(item.id) as Dish & { quantity: number };
  const handleAddItem = () => {
    addItem(item);
  };

  return {
    handleRemove,
    handleRemoveItemCompletely,
    itemsInCart,
    handleAddItem,
  };
};
