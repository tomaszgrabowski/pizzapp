import { type NextPage } from "next";
import React, { FC } from "react";
import RestaurantMenu from "@/components/home/restaurant-menu/RestaurantMenu";
import Tables from "@/components/home/tables/Tables";
import OrderButtons from "@/components/common/order-buttons/OrderButtons";
import { TableProvider } from "@/components/common/table-provider/TableProvider";

const Page: NextPage = () => {
  return (
    <TableProvider>
      <main>
        Our menu:
        <Tables />
        <RestaurantMenu />
        <OrderButtons />
      </main>
    </TableProvider>
  );
};

export default Page;
