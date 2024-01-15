import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Main } from "@/components/main.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useUserStore } from "@/stores/user.ts";

export const LoginRoute: FC = () => {
  const userStore = useUserStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("username", username);
    formData.set("password", password);

    void userStore.login(formData);
  };

  return (
    <Main className="flex flex-col justify-center items-center">
      <Card className="max-w-[480px] w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>All chatters must log into their accounts!</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  placeholder="john"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-1.5">
          <Button type="submit" form="login-form" className="w-full">
            Login
          </Button>
          <p className="text-sm text-muted-foreground self-start">
            Don&apos;t have an account yet?{" "}
            <Link to="/register" className="underline">
              Create one!
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Main>
  );
};
