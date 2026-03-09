"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FetchResumeHistory from "../_components/FetchResumeHistory";
import { LogOut, User2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Home = () => {
  const router = useRouter();
  const { token, hydrate, logout, user } = useAuth();

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
            <div className="flex justify-end items-center w-full gap-x-2">
              <Dialog>
                <DialogTrigger>
                  <User2 className="w-4 h-4 cursor-pointer" />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Your Information:</DialogTitle>
                  <h4 className="font-medium text-sm mt-4">
                    Name: {user?.name}
                  </h4>
                  <h4 className="font-medium text-sm">Email: {user?.email}</h4>
                  <h4 className="font-medium text-sm">
                    Joined Date: {user?.created_at.split("T")[0]}
                  </h4>
                </DialogContent>
              </Dialog>
              <Button variant={"ghost"} onClick={logout}>
                <LogOut />
              </Button>
            </div>
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
