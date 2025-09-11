import { ROUTE_PATHS } from "@/constants";
import { cn, useOnClickOutside } from "@/lib/utils";
import { useGetProfile, useLogout } from "@/services";
import { authUtils } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useRef, useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const ProfileDropdown: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();
  const { data: profileResponse, isLoading } = useGetProfile();
  const user = profileResponse?.ok ? profileResponse.body : null;

  const profileRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  useOnClickOutside(profileRef, () => setIsProfileOpen(false));

  const handleLogout = async () => {
    await logout();
    authUtils.logout();
    navigate(ROUTE_PATHS.AUTH.LOGIN);
    setIsProfileOpen(false);
  };

  if (isLoading || !user) {
    return (
      <div className="relative hidden md:block">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="relative hidden md:flex items-center" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-postvibe-purple hover:ring-offset-2 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-postvibe-purple focus:ring-offset-2"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={fullName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={cn(
            "w-full h-full bg-postvibe-purple flex items-center justify-center text-white text-sm font-medium",
            {
              hidden: !!user.avatar,
            }
          )}
        >
          {getInitials(user.firstName, user.lastName)}
        </div>
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="absolute right-0 -bottom-2 translate-y-full w-64 p-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
          >
            <div className="px-3 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={fullName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                  ) : null}
                  <div
                    className={cn(
                      "w-full h-full bg-postvibe-purple flex items-center justify-center text-white text-sm font-medium",
                      {
                        hidden: !!user.avatar,
                      }
                    )}
                  >
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <button
                onClick={handleLogout}
                disabled={isLogoutPending}
                className="hover:bg-red-50 flex items-center gap-3 w-full px-3 py-2 rounded-md transition-colors duration-150 text-left text-sm text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut className="w-4 h-4" />
                <span>{t("button.logout")}</span>
                {isLogoutPending && (
                  <div className="ml-auto">
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
