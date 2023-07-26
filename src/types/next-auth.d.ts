/* eslint-disable @typescript-eslint/no-empty-interface */

import type { User } from "@prisma/client";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Account {}
  interface Profile extends User {}
  interface Session {
    accessToken: string;
    user: User & DefaultUser;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    profile: Profile;
  }
}
