"use client";

import React, { FC } from "react";
import { Item, useCart } from "react-use-cart";
import { Dish } from ".prisma/client";
import { api } from "@/utils/api";

const Cart = () => {
  const { items, emptyCart } = useCart();
  const handlePlaceOrder = () => {
    const mutation = api.orders.upsertOrder.useMutation();
    mutation.mutate({
      dishes: items.map((item) => item.id),
    });
    emptyCart();
  };

  const clearCart = () => {
    emptyCart();
    console.log("Cart: ", items);
  };
  return (
    <>
      <ul className="flex flex-col flex-wrap">
        {items.map((item) => (
          <li key={item.id} className="m-2 flex flex-col border">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <div className="bg-blue-200 p-2" onClick={handlePlaceOrder}>
        place order
      </div>
      <div className="bg-blue-200 p-2" onClick={clearCart}>
        clear cart
      </div>
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
  const { updateItem, removeItem, getItem, addItem, updateItemQuantity } =
    useCart();

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
