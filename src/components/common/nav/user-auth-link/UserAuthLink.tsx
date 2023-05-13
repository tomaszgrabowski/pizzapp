"use client";

import React, { FC, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const UserAuthLink: FC = () => {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      {session.data?.user?.name && (
        <li>
          <a href="#" onClick={handleLogout}>
            Logout {session.data?.user?.name}
          </a>
        </li>
      )}
      {!session.data?.user && (
        <>
          <li>
            <a href="#" onClick={handleLogin}>
              Login
            </a>
          </li>
          <li>
            <a href="/auth/register">Register</a>
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
