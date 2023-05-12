"use client";
import React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import { CartProvider } from "react-use-cart";
import Nav from "@/components/common/nav/Nav";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html data-theme="emerald" className={"bg-slate-100"} lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Pizzapp</title>
        <meta
          name="description"
          content="Pizza ordering app for small pizzerias"
        />
        <meta name="author" content="Tomasz Grabowski" />
        <meta name="color-scheme" content="light only" />
      </head>

      <body className="flex flex-col bg-slate-100 text-black antialiased">
        <SessionProvider>
          <Nav />
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
};

export default api.withTRPC(RootLayout);
