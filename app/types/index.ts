import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "hashedPassword" | "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}