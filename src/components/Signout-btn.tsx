"use client";
import React from "react";
import { Button } from "./ui/button";
import { logOut } from "@/actions/action";

export default function SignOutButton() {
  return <Button onClick={async () => await logOut()}>Sign Out</Button>;
}
