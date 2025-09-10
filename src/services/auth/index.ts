import type { TLoginRequest, TLoginResponse, TResponse, TUser } from "@/types";
import api from "@/config/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_QUERY_KEYS } from "@/config/react-query";

export const authApi = {
  login: async (data: TLoginRequest): Promise<TResponse<TLoginResponse>> => {
    return await api.post<TLoginResponse>("/auth/login", data);
  },
  getProfile: async (): Promise<TResponse<TUser>> => {
    return await api.get<TUser>("/auth/me");
  },
};

export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
  });

export const useGetProfile = () =>
  useQuery({
    queryKey: [BASE_QUERY_KEYS.PROFILE],
    queryFn: authApi.getProfile,
    staleTime: 1000 * 60 * 3,
  });
