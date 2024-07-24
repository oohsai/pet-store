import H1 from "@/components/H1";
import AuthForm from "@/components/authForm";
import Link from "next/link";
import React from "react";

export default function SignupPage() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-5 text-center">Sign Up</H1>
      <AuthForm type="signUp" />
      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium">
          Login
        </Link>
      </p>
    </main>
  );
}
