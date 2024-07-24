import ContentBlock from "@/components/ContentBlock";
import H1 from "@/components/H1";
import SignOutButton from "@/components/Signout-btn";
import { checkAuth } from "@/lib/server-utils";

export default async function AccountPage() {
  const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>
      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {session?.user.email}</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
}
