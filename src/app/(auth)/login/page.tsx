import H1 from "@/components/H1";
import AuthForm from "@/components/authForm";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-5 text-center">Log In</H1>
      <AuthForm type="logIn" />
      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
