import { APP_CONFIG, ROUTE_PATHS } from "@/constants";
import type { FunctionComponent } from "react";
import { Link } from "react-router";
import { ProfileDropdown } from "./profile-dropdown";
import { SearchDropdown } from "./search-dropdown";

export const Header: FunctionComponent = () => {
  return (
    <header className="w-full px-4 md:px-10 lg:px-[10%] py-3 border-b border-gray-300 bg-white flex items-center justify-between">
      <h1 className="text-2xl font-bold text-postvibe-purple">
        <Link to={ROUTE_PATHS.ROOT}>{APP_CONFIG.NAME}</Link>
      </h1>

      <div className="flex items-center gap-4">
        <SearchDropdown />
        <ProfileDropdown />
      </div>
    </header>
  );
};
