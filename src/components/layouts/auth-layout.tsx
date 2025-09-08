import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";

export const AuthLayout: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[url('/images/auth-bg.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="w-full grid grid-cols-2 max-w-2xl relative rounded-lg overflow-hidden">
        <div className="col-span-1 w-full bg-postvibe-purple/80 py-20 px-10 text-white space-y-6">
          <h1 className="text-xl font-semibold">Join the club</h1>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus.
          </p>
        </div>
        <div className="col-span-1 w-full bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
