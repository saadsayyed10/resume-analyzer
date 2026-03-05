"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const { token, hydrate, logout } = useAuth();

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login");
    }
  }, [token, router]);

  return (
    <>
      {token ? (
        <div className="flex justify-center items-center w-full flex-col gap-y-10">
          <Button onClick={logout}>Logout</Button>
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default Home;
