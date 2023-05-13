"use client";
import { api } from "@/utils/api";
import { Dish } from ".prisma/client";
import Link from "next/link";
import React, { FC } from "react";
import { useCartItem } from "@/components/cart/Cart";

const RestaurantMenu: FC = () => {
  const { data: menu } = api.dishes.getRestaurantMenu.useQuery();

  return (
    <>
      <ul className="flex flex-wrap">
        {menu?.map((dish) => (
          <MenuItem key={dish.id} dish={dish} />
        ))}
      </ul>
    </>
  );
};

export default RestaurantMenu;

const MenuItem: FC<{ dish: Dish }> = ({ dish }) => {
  const {
    itemsInCart,
    handleRemove,
    handleRemoveItemCompletely,
    handleAddItem,
  } = useCartItem(dish);

  return (
    <li className="m-2 flex flex-col items-center justify-center border p-2">
      <Link href={`/dish/${dish.id}`}>{dish.name}</Link>
      <div onClick={handleAddItem}>Add</div>
      <div onClick={handleRemoveItemCompletely}>Remove</div>

      <div onClick={handleRemove}>-</div>
      {itemsInCart?.quantity ?? 0}
      <div onClick={handleAddItem}>+</div>
      <div onClick={handleRemoveItemCompletely}>Clear</div>
    </li>
  );
};
