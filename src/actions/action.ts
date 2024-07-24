"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/server-utils";

//User Action

export async function logIn(formData: FormData) {
  await signIn("credentials", formData);
}

export async function signUp(formData: FormData) {
  const hashedPassword = await bcrypt.hash(
    formData.get("password") as string,
    10
  );
  try {
    await prisma.user.create({
      data: {
        email: formData.get("email") as string,
        hashedPassword: hashedPassword,
      },
    });
  } catch (error) {
    console.log("Try Again");
  }

  await signIn("credentials", formData);
}

export async function logOut() {
  await signOut({
    redirectTo: "/",
  });
}
//Pet Actions

export async function addPet(pet: PetEssentials) {
  const session = await checkAuth();

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return {
      message: "Invalid Pet Data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: "error in adding pet",
    };
  }
  revalidatePath("/app", "layout");
}

export async function editPet(petId: unknown, newPetData: unknown) {
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petFormSchema.safeParse(newPetData);

  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "Not Authorized",
    };
  }
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
  const session = await checkAuth();

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId!.success) {
    return {
      message: "Invalid Pet Id",
    };
  }

  //auth check
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
    select: {
      userId: true,
    },
  });
  if (!pet) {
    return {
      message: "Pet not found",
    };
  }
  if (pet.userId !== session.user.id) {
    return {
      message: "Not Authorized",
    };
  }

  //db check
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
