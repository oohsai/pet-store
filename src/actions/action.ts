"use server";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(pet: PetEssentials) {
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return {
      message: "error in adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return {
      message: "Could Not edit Pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: Pet["id"]) {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    return {
      message: "Try Again",
    };
  }
  revalidatePath("/app", "layout");
}
