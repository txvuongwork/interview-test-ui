import { APP_CONFIG } from "@/constants";
import { Edit, MessageCircle, Search } from "lucide-react";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

type TKeyFeature = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
};

export const AuthLayout: FunctionComponent = () => {
  const { t } = useTranslation();

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
      <div className="w-full grid grid-cols-2 max-w-3xl relative rounded-lg overflow-hidden">
        <div className="col-span-1 w-full bg-postvibe-purple/80 py-20 px-10 text-white space-y-6">
          <h1 className="text-xl font-semibold">
            {t("authLayout.title", {
              platform: APP_CONFIG.NAME,
            })}
          </h1>
          <p className="text-sm">{t("authLayout.subtitle")}</p>

          <div className="space-y-4">
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
        <div className="col-span-1 w-full bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
