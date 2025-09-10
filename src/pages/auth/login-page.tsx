import { Button, Form, InputField } from "@/components";
import { useAuthSchema, type TLoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { Link, useNavigate } from "react-router";
import { ROUTE_PATHS } from "@/constants";
import { useLogin } from "@/services";

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginFormSchema } = useAuthSchema();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();

  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = (data: TLoginFormSchema) => {
    login(data);
    // navigate(ROUTE_PATHS.ROOT);
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-6 h-full justify-center"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{t("loginPage.title")}</h1>
            <p className="text-sm">{t("loginPage.subtitle")}</p>
          </div>

          <div className="w-full space-y-4">
            <InputField
              control={control}
              name="email"
              label={t("field.email.label")}
              placeholder={t("field.email.placeholder", {
                field: _.lowerCase(t("field.email.label")),
              })}
            />
            <InputField
              control={control}
              name="password"
              label={t("field.password.label")}
              placeholder={t("field.password.placeholder")}
              type="password"
            />
          </div>

          <div className="w-full space-y-2">
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isLoginPending}
            >
              {t("button.login")}
            </Button>
            <p className="text-sm text-center">
              {t("loginPage.dontHaveAccount")}
              <Link
                className="font-medium text-postvibe-purple"
                to={ROUTE_PATHS.AUTH.REGISTER}
              >{` ${t("button.register")}`}</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
