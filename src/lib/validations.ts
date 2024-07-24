import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, {
        message: "Name is  required",
      })
      .max(20),
    ownerName: z
      .string()
      .trim()
      .min(3, {
        message: "Ownername is required",
      })
      .max(20),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image Url must be a valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(90),
    notes: z.union([z.literal(""), z.string().trim().max(300)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().max(100),
});
