"use client";
import { usePetContext } from "@/lib/hooks";
import { useContext } from "react";

export default function Stats({ children }: { children: React.ReactNode }) {
  const { numberofPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberofPets}</p>
      <p className="opacity-80">{children}</p>
    </section>
  );
}
