"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormBtn from "./pet-form-btn";

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
  return (
    <form
      action={async (formData) => {
        onFormSubmission();
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          age: Number(formData.get("age")),
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          notes: formData.get("notes") as string,
        };

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
          <Input
            name="name"
            id="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.name : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            name="ownerName"
            id="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            name="imageUrl"
            id="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            name="age"
            id="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedPet?.age : ""}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            name="notes"
            id="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
          />
        </div>
      </div>
      <PetFormBtn actionType={actionType} />
    </form>
  );
}
