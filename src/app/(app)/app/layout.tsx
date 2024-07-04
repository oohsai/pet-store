import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/Footer";
import AppHeader from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/pet-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import prisma from "@/lib/db";
import { Pet } from "@/lib/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pets = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] py-3 mx-auto min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
