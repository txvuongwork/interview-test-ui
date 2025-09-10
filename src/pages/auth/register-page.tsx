import { Button, Form, InputField } from "@/components";
import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import { useAuthSchema, type TRegisterFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const RegisterPage: FunctionComponent = () => {
  const { t } = useTranslation();
  const { registerFormSchema } = useAuthSchema();

  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = form;

  const onSubmit = (data: TRegisterFormSchema) => {
    console.log(data);
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center gap-6 md:gap-4 h-full justify-center"
        >
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">
              {t("registerPage.title", {
                platform: APP_CONFIG.NAME,
              })}
            </h1>
            <p className="text-sm">{t("registerPage.subtitle")}</p>
          </div>

          <div className="w-full space-y-4 md:max-h-[45dvh] px-1 md:py-4 overflow-y-auto">
            <InputField
              control={control}
              name="firstName"
              label={t("field.firstName.label")}
              placeholder={t("field.firstName.placeholder")}
            />
            <InputField
              control={control}
              name="lastName"
              label={t("field.lastName.label")}
              placeholder={t("field.lastName.placeholder")}
            />
            <InputField
              control={control}
              name="email"
              label={t("field.email.label")}
              placeholder={t("field.email.placeholder")}
            />
            <InputField
              control={control}
              name="password"
              label={t("field.password.label")}
              placeholder={t("field.password.placeholder")}
              type="password"
            />
          </div>

          <div className="w-full space-y-2 px-1">
            <Button type="submit" disabled={!isDirty || !isValid}>
              {t("button.register")}
            </Button>
            <p className="text-sm text-center">
              {t("registerPage.alreadyHaveAccount")}
              <Link
                className="font-medium text-postvibe-purple"
                to={ROUTE_PATHS.AUTH.LOGIN}
              >{` ${t("button.login")}`}</Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};
