"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type PetListProps = {
  pets: Pet[];
};

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {filteredPets.map((pet) => {
        return (
          <li key={pet.id}>
            <button
              onClick={() => handleChangeSelectedPetId(pet.id)}
              className={cn(
                "flex items-center px-5 text-base gap-2 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition h-[70px] w-full cursor-pointer",
                {
                  "bg-[#eff1f2]": selectedPetId === pet.id,
                }
              )}
            >
              <Image
                src={pet.imageUrl}
                alt="profile image"
                width={45}
                height={45}
                className="h-[45px] w-[45px] rounded-full object-cover"
              />
              <p className="font-semibold">{pet.name}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
