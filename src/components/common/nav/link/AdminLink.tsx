"use client";

import React, { FC } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AdminLink: FC<{ name: string; href: string }> = ({ name, href }) => {
  const session = useSession();
  return <>{session.data?.user && <Link href={href}>{name}</Link>}</>;
};

export default AdminLink;
