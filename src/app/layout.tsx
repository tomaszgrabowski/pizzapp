"use client";
import React from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html data-theme="emerald" className={"bg-slate-100"} lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Osiedle Szmaragdowy Park</title>
        <meta
          name="description"
          content="Osiedle Szmaragdowy Park w Gdańsku, położone na gdańskiej Górnej Orunii na ulicy Topazowej w bezpośredniej bliskości zbiornika Kolorowa."
        />
        <meta name="author" content="Tomasz Grabowski" />
        <meta name="color-scheme" content="light only" />
      </head>

      <body className="flex flex-col bg-slate-100 text-black antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default api.withTRPC(RootLayout);
