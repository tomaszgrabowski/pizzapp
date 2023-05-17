import React, { FC } from "react";
import Link from "next/link";
import ProtectedLink from "@/components/common/nav/link/ProtectedLink";
import UserAuthLink from "@/components/common/nav/user-auth-link/UserAuthLink";

const Nav: FC = () => {
  return (
    <div>
      <ul className="flex justify-between">
        {generateNav()}
        <UserAuthLink />
      </ul>
    </div>
  );
};

const generateNav = () => {
  return navManu.map((item) => {
    if (item.isProtected) {
      return (
        <li key={item.name}>
          <ProtectedLink name={item.name} href={item.path} />
        </li>
      );
    }
    return (
      <li key={item.name}>
        <Link href={item.path} key={item.name}>
          {item.name}
        </Link>
      </li>
    );
  });
};

export default Nav;

const navManu = [
  {
    name: "Home",
    path: "/",
    isProtected: false,
  },
  {
    name: "Menu",
    path: "/menu",
    isProtected: true,
  },
  {
    name: "Cart",
    path: "/cart",
    isProtected: true,
  },
  {
    name: "Kitchen",
    path: "/kitchen",
    isProtected: true,
  },
  {
    name: "Serve",
    path: "/serve",
    isProtected: true,
  },
];
