"use client";

import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

const LogoutButton = () => {
  const { user, logout } = useAuth();

  console.log(user);
  return (
    <Button onClick={logout} className="mx-auto mt-4 w-max">
      Logout
    </Button>
  );
};

export default LogoutButton;
