import { type NextPage } from "next";
import React from "react";
import RestaurantMenu from "@/components/home/restaurant-menu/RestaurantMenu";

const Page: NextPage = () => {
  return (
    <main>
      Our menu:
      <RestaurantMenu />
    </main>
  );
};

export default Page;
