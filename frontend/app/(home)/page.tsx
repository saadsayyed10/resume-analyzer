"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FetchResumeHistory from "../_components/FetchResumeHistory";
import { LogOut } from "lucide-react";

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
          <div className="flex justify-between items-center w-full px-10 py-6">
            <h1 className="font-light text-2xl">
              <span className="font-medium text-4xl">D</span>elphina
            </h1>
            <Button variant={"ghost"} size={"lg"} onClick={logout}>
              <LogOut />
            </Button>
          </div>
          <FetchResumeHistory />
        </div>
      ) : (
        <div />
      )}
    </>
  );
};

export default Home;
