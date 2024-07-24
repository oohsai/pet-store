import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: String;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}
