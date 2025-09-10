import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import _ from "lodash";

export const useAuthSchema = () => {
  const { t } = useTranslation();

  const loginFormSchema = useMemo(
    () =>
      z.object({
        email: z.email({
          error: t("errorMessage.invalidFormat", {
            field: _.lowerCase(t("field.email.label")),
          }),
        }),
        password: z
          .string()
          .trim()
          .min(1, {
            message: t("errorMessage.required", {
              field: _.lowerCase(t("field.password.label")),
            }),
          }),
      }),
    [t]
  );

  const registerFormSchema = useMemo(
    () =>
      z.object({
        firstName: z
          .string()
          .trim()
          .min(1, {
            message: t("errorMessage.required", {
              field: _.lowerCase(t("field.firstName.label")),
            }),
          }),
        lastName: z
          .string()
          .trim()
          .min(1, {
            message: t("errorMessage.required", {
              field: _.lowerCase(t("field.lastName.label")),
            }),
          }),
        email: z
          .email({
            error: t("errorMessage.invalidFormat", {
              field: _.lowerCase(t("field.email.label")),
            }),
          })
          .max(100, {
            message: t("errorMessage.maxLength", {
              field: _.capitalize(t("field.email.label")),
              max: 100,
            }),
          }),
        password: z
          .string()
          .trim()
          .min(1, {
            message: t("errorMessage.required", {
              field: _.lowerCase(t("field.password.label")),
            }),
          })
          .min(6, {
            message: t("errorMessage.minLength", {
              field: _.capitalize(t("field.password.label")),
              min: 6,
            }),
          }),
      }),
    [t]
  );

  return {
    loginFormSchema,
    registerFormSchema,
  };
};

export type TLoginFormSchema = z.infer<
  ReturnType<typeof useAuthSchema>["loginFormSchema"]
>;
export type TRegisterFormSchema = z.infer<
  ReturnType<typeof useAuthSchema>["registerFormSchema"]
>;
