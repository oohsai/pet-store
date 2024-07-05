"use server";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(pet: PetEssentials) {
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "error in adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPetId!.success || !validatedPet.success) {
    return {
      message: "Invalid Pet Id",
    };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could Not edit Pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: unknown) {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId!.success) {
    return {
      message: "Invalid Pet Id",
    };
  }
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return {
      message: "Try Again",
    };
  }
  revalidatePath("/app", "layout");
}
