import React, { useContext } from "react";
import { Button } from "./ui/button";

type PetFormBtnProps = {
  actionType: string;
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button type="submit" className="mt-2 self-end">
      {actionType === "add" ? "Add Pet" : "Edit pet"}
    </Button>
  );
}
