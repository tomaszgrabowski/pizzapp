"use client";

import React, { FC } from "react";
import { Item, useCart } from "react-use-cart";

const Cart = () => {
  const { items } = useCart();
  return (
    <ul className="flex flex-col flex-wrap">
      {items.map((item) => (
        <li key={item.id} className="m-2 flex flex-col border">
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};

export default Cart;

const CartItem: FC<{ item: Item }> = ({ item }) => {
  const { updateItem, removeItem } = useCart();
  const handleAdd = () => {
    console.log(item);
    const quantity = item.quantity ?? 0;
    updateItem(item.id, { quantity: quantity + 1 });
  };
  const handleRemove = () => {
    const quantity = item.quantity ?? 0;
    if (quantity > 1) {
      updateItem(item.id, { quantity: quantity - 1 });
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };
  return (
    <>
      {item.name} - {item.quantity}
      <div onClick={handleRemove}>-</div>
      <div onClick={handleAdd}>+</div>
      <div onClick={handleRemoveItem}>Remove</div>
    </>
  );
};
