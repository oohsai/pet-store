"use client";
import { useSearchContext } from "@/lib/hooks";
import React from "react";

export default function SearchForm() {
  const { handleChangeSearchQuery, searchQuery } = useSearchContext();
  return (
    <form className="w-full h-full ">
      <input
        className="w-full h-full bg-white/20 px-5 rounded-md outline-none transition focus:bg-white/50 hover:bg-white/25 placeholder:text-white/50"
        placeholder="Search Pets.."
        type="Search"
        value={searchQuery}
        onChange={(e) => handleChangeSearchQuery(e.target.value)}
      />
    </form>
  );
}
