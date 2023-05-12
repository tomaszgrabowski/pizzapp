"use client";
import { api } from "@/utils/api";
import { Dish } from ".prisma/client";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { companyId } from "@/utils/identity";
import { FC } from "react";

const RestaurantMenu: FC = () => {
  const { data: menu } = api.dishes.getRestaurantMenu.useQuery();
  const mutation = api.orders.upsertOrder.useMutation();
  const { items, emptyCart } = useCart();

  const handlePlaceOrder = () => {
    mutation.mutate({
      companyId: companyId,
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
      <ul className="flex flex-wrap">
        {menu?.map((dish) => (
          <MenuItem key={dish.id} dish={dish} />
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

export default RestaurantMenu;

const MenuItem: FC<{ dish: Dish }> = ({ dish }) => {
  const { addItem, removeItem, getItem } = useCart();
  const handleAddToCart = () => {
    addItem(dish);
  };
  const itemsInCart = getItem(dish.id) as Dish & { quantity: number };
  const handleRemoveItem = () => {
    removeItem(dish.id);
  };

  return (
    <li className="m-2 flex flex-col items-center justify-center border p-2">
      <Link href={`/dish/${dish.id}`}>{dish.name}</Link>
      items in cart: {itemsInCart?.quantity}
      <button onClick={handleAddToCart}>Add to cart</button>
      <button onClick={handleRemoveItem}>remove from cart </button>
    </li>
  );
};
