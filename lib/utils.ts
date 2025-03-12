import { Store } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { atom } from "jotai";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const addStoreAdminSchema = z.object({
  email: z.string().email(),
  storeId: z.string(),
});
export const isAdminAtomInst = atom<
  | {
      isAdmin: boolean;
      isBusiness: boolean;
      ownedStore: Store;
      adminManagedStoreId: number;
    }
  | undefined
>(undefined);

