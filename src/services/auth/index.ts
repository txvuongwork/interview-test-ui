import type {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TResponse,
  TUser,
} from "@/types";
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
  logout: async (): Promise<TResponse<void>> => {
    return await api.post<void>("/auth/logout");
  },
  register: async (data: TRegisterRequest): Promise<TResponse<TUser>> => {
    return await api.post<TUser>("/auth/register", data);
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

export const useLogout = () =>
  useMutation({
    mutationFn: authApi.logout,
  });

export const useRegister = () =>
  useMutation({
    mutationFn: authApi.register,
  });
