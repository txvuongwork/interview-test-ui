import type { TLoginRequest, TLoginResponse, TResponse } from "@/types";
import api from "@/config/axios";
import { useMutation } from "@tanstack/react-query";

export const authApi = {
  login: async (data: TLoginRequest): Promise<TResponse<TLoginResponse>> => {
    return await api.post<TLoginResponse>("/auth/login", data);
  },
};

export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
  });
