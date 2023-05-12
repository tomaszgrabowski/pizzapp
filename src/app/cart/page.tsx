import React from "react";
import { NextPage } from "next";
import Cart from "@/components/cart/Cart";

const Page: NextPage = () => {
  return (
    <>
      <h2>Cart</h2>
      <Cart />
    </>
  );
};

export default Page;
