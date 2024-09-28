"use client";

import { UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to load user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  function logout() {
    fetch("/api/auth/logout", { method: "POST" })
      .then(() => {
        setUser(null);
        location.assign("/sign-in");
      })
      .catch(console.error);
  }

  async function updateUser(updatedData: Partial<User>) {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        router.refresh();
        return updatedUser;
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user", error);
      throw error;
    }
  }

  return { user, loading, logout, updateUser };
};
