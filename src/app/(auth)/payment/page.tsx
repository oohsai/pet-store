import H1 from "@/components/H1";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <main className="flex flex-col items-center space-y-2">
      <H1>PetSoft access requires payments</H1>
      <Button>Buy Lifetime access</Button>
    </main>
  );
}
