import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import { Edit, MessageCircle, Search } from "lucide-react";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router";

type TKeyFeature = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

export const AuthLayout: FunctionComponent = () => {
  const { t } = useTranslation();

  const token = localStorage.getItem(APP_CONFIG.ACCESS_TOKEN_KEY);
  if (token) {
    return <Navigate to={ROUTE_PATHS.ROOT} replace />;
  }

  const keyFeatures: TKeyFeature[] = [
    {
      title: t("authLayout.keyFeatures.0.title"),
      subtitle: t("authLayout.keyFeatures.0.subtitle"),
      icon: <Edit className="size-5 text-white" />,
    },
    {
      title: t("authLayout.keyFeatures.1.title"),
      subtitle: t("authLayout.keyFeatures.1.subtitle"),
      icon: <Search className="size-5 text-white" />,
    },
    {
      title: t("authLayout.keyFeatures.2.title"),
      subtitle: t("authLayout.keyFeatures.2.subtitle"),
      icon: <MessageCircle className="size-5 text-white" />,
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/images/auth-bg.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 max-w-3xl relative md:rounded-lg overflow-hidden">
        <div className="col-span-1 w-full order-2 md:order-1 bg-postvibe-purple/80 py-10 px-5 md:px-10 text-white gap-5 md:gap-6 h-full flex flex-col justify-center">
          <h1 className="text-lg md:text-xl font-semibold leading-none">
            {t("authLayout.title", {
              platform: APP_CONFIG.NAME,
            })}
          </h1>
          <p className="text-sm">{t("authLayout.subtitle")}</p>

          <div className="space-y-3 md:space-y-4">
            {keyFeatures.map((feature) => (
              <div key={feature.title}>
                <div className="flex items-start gap-3">
                  <div className="p-2 border border-white rounded-md">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base leading-none font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-sm">{feature.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 w-full order-1 md:order-2 bg-white px-5 md:px-10 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
