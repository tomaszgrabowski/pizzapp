"use client";

import React, { FC } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const UserAuthLink: FC = () => {
  const { data } = useSession();

  return (
    <>
      {data?.user && (
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      )}
      {!data?.user && (
        <>
          <li>
            <a href="#" onClick={handleLogin}>
              Login
            </a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
        </>
      )}
    </>
  );
};

export default UserAuthLink;

const handleLogout = async () => {
  await signOut();
};
const handleLogin = async () => {
  await signIn();
};
