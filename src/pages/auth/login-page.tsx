import { Button, ErrorModal, Form, InputField } from "@/components";
import { BASE_QUERY_KEYS } from "@/config/react-query";
import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import { useAuthSchema, type TLoginFormSchema } from "@/schemas";
import { useLogin } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { LoaderCircle } from "lucide-react";
import { useState, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";

export const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { loginFormSchema } = useAuthSchema();
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();

  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const onSubmit = async (data: TLoginFormSchema) => {
    const response = await login(data);

    if (response.ok) {
      localStorage.setItem(APP_CONFIG.ACCESS_TOKEN_KEY, response.body.token);
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEYS.PROFILE] });
      navigate(ROUTE_PATHS.ROOT);
    } else {
      setErrorMessage(response.error.message);
    }
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
              {t("button.login")}{" "}
              {isLoginPending && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
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

      <ErrorModal isOpen={!!errorMessage} onClose={() => setErrorMessage("")}>
        <p className="text-base">{t(errorMessage)}</p>
      </ErrorModal>
    </div>
  );
};
