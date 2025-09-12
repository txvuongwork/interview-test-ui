import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import type { FunctionComponent } from "react";
import { Link } from "react-router";
import { ProfileDropdown } from "./profile-dropdown";
import { SearchDropdown } from "./search-dropdown";
import { MobileMenu } from "./mobile-menu";

export const Header: FunctionComponent = () => {
  return (
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-[8%] xl:px-[10%] py-3 border-b border-gray-300 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-bold text-postvibe-purple">
            <Link to={ROUTE_PATHS.ROOT}>{APP_CONFIG.NAME}</Link>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <SearchDropdown />
          <ProfileDropdown />
        </div>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};
