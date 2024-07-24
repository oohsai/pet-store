"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";
import { useForm } from "react-hook-form";
import { PetEssentials } from "@/lib/types";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import { TPetForm, petFormSchema } from "@/lib/validations";

type PetFormProps = {
  actionType: string;
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();
  //   const [error, formAction] = useFormState(addPet, {});
  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     const formData = new FormData(event.currentTarget);
  //     const pet = {
  //       name: formData.get("name") as string,
  //       ownerName: formData.get("ownerName") as string,
  //       imageUrl:
  //         (formData.get("imageUrl") as string) ||
  //         "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
  //       age: +(formData.get("age") as string),
  //       notes: formData.get("notes") as string,
  //     };
  //     if (actionType === "add") {
  //       handleAddPet(pet);
  //     } else if (actionType === "edit") {
  //       handleEditPet(selectedPet!.id, pet);
  //     }
  //     onFormSubmission();
  //   };

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TPetForm>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            age: selectedPet?.age,
            imageUrl: selectedPet?.imageUrl,
            notes: selectedPet?.notes,
          }
        : undefined,
  });
  return (
    <form
      action={async (formData) => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();
        // const petData = {
        //   name: formData.get("name") as string,
        //   ownerName: formData.get("ownerName") as string,
        //   age: Number(formData.get("age")),
        //   imageUrl:
        //     (formData.get("imageUrl") as string) ||
        //     "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
        //   notes: formData.get("notes") as string,
        // };
        const petData = getValues();
        petData.imageUrl = petData.imageUrl || DEFAULT_PET_IMAGE;

        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <span className="text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input id="ownerName" {...register("ownerName")} />
          {errors.ownerName && (
            <span className="text-red-600">{errors.ownerName.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input {...register("imageUrl")} id="imageUrl" />
          {errors.imageUrl && (
            <span className="text-red-600">{errors.imageUrl.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input {...register("age")} id="age" />
          {errors.age && (
            <span className="text-red-600">{errors.age.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea {...register("notes")} id="notes" />
          {errors.notes && (
            <span className="text-red-600">{errors.notes.message}</span>
          )}
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
