"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

type AuthFormBtnProps = {
  type: "logIn" | "signUp";
};

export default function AuthFormBtn({ type }: AuthFormBtnProps) {
  const { pending } = useFormStatus();
  return (
    <div>
      <Button disabled={pending} className="mt-4 ">
        {type === "logIn" ? "Log In" : "Sign Up"}
      </Button>
    </div>
  );
}
