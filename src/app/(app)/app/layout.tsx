import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/Footer";
import AppHeader from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/pet-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/server-utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  console.log(session.user);

  const pets = await prisma.pet.findMany({
    where: {
      userId: session.user.id,
    },
  });
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
