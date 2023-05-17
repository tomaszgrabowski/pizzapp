import React from "react";
import { NextPage } from "next";
import ServePanel from "@/components/serve/ServePanel";

const Page: NextPage = () => {
  return (
    <>
      <h2>Serve</h2>
      <ServePanel />
    </>
  );
};

export default Page;
