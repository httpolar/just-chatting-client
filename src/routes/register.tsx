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
import { Link, useNavigate } from "react-router-dom";
import { isErrorJson, register } from "@/lib/api.ts";
import { toast } from "sonner";

export const RegisterRoute: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error("Verify your passwords", {
        description: "Password and confirmation don't match.",
      });
    }

    const handleAsync = async () => {
      const res = await register(username, password);
      const json = (await res.json()) as unknown;

      if (isErrorJson(json)) {
        toast.error(json.message);
      }

      if (res.ok) {
        toast.success("You have registered!", {
          description: "Now you have an account, try logging in.",
          action: {
            label: "Login",
            onClick: () => navigate("/login"),
          },
        });
      }
    };

    void handleAsync();
  };

  return (
    <Main className="flex flex-col justify-center items-center">
      <Card className="max-w-[480px] w-full">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
          <CardDescription>You need an account to start chatting!</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-form" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="john"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="******"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password-confirm">Password Confirmation</Label>
                <Input
                  id="password-confirm"
                  placeholder="******"
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-1.5">
          <Button type="submit" form="register-form" className="w-full">
            Create account
          </Button>
          <p className="text-sm text-muted-foreground self-start">
            Already a member of just chatting?{" "}
            <Link to="/login" className="underline">
              Login!
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Main>
  );
};
