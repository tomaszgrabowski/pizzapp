import React from "react";
import { NextPage } from "next";
import Cart from "@/components/cart/Cart";
import { TableProvider } from "@/components/common/table-provider/TableProvider";

const Page: NextPage = () => {
  return (
    <>
      <h2>Cart</h2>
      <TableProvider>
        <Cart />
      </TableProvider>
    </>
  );
};

export default Page;
