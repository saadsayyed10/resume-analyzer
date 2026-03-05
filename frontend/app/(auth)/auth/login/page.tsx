"use client";

import { loginUserAPI } from "@/api/users.api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const { setAuth, hydrate, token } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUserAPI(email, password);
      console.log(res.data);
      const { token, user } = res.data;

      setAuth(token, user);

      router.replace("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (token) {
      router.replace("/");
    }
  }, [token, router]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="t@grove.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Login"}
          </Button>
          <h6 className="text-center w-full uppercase font-bold text-muted-foreground text-xs">
            OR
          </h6>
          <Button asChild variant="outline" className="w-full">
            <Link href={"/auth/sign-up"}>Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
