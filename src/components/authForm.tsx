import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { logIn, signUp } from "@/actions/action";

type AuthFormProps = {
  type: "logIn" | "signUp";
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form
      action={type === "logIn" ? logIn : signUp}
      className="space-y-2 flex flex-col items-center"
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <Button className="mt-4 ">
        {type === "logIn" ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}
