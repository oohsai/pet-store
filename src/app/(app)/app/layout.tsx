import BackgroundPattern from "@/components/BackgroundPattern";
import AppFooter from "@/components/Footer";
import AppHeader from "@/components/Header";
import PetContextProvider from "@/context/pet-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import { Pet } from "@/lib/types";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );
  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }

  const data: Pet[] = await response.json();
  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] py-3 mx-auto min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>
    </>
  );
}
