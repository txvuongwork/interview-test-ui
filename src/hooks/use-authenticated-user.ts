import { useGetProfile } from "@/services";
import type { TUser } from "@/types";

export const useAuthenticatedUser = (): TUser => {
  const { data: response } = useGetProfile();

  const user = response?.ok ? response.body : null;

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
};
