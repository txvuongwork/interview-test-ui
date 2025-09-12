import { Input } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import { useSearch } from "@/hooks";
import { cn, useOnClickOutside } from "@/lib/utils";
import { useGetProfile, useLogout } from "@/services";
import { authUtils } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, Search, X } from "lucide-react";
import { useRef, useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";

export const MobileMenu: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: logout, isPending: isLogoutPending } = useLogout();
  const { data: profileResponse, isLoading } = useGetProfile();
  const { searchValue, onChange, debouncedSearchValue } = useSearch();

  const user = profileResponse?.ok ? profileResponse.body : null;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useOnClickOutside(menuRef, () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  });

  const handleLogout = async () => {
    await logout();
    authUtils.logout();
    navigate(ROUTE_PATHS.AUTH.LOGIN);
    setIsMenuOpen(false);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const isSearchPage = location.pathname === ROUTE_PATHS.BLOG.SEARCH;

  if (isLoading || !user) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-postvibe-purple focus:ring-offset-2"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  {t("mobileMenu.title")}
                </h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {!isSearchPage && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      {t("header.search")}
                    </h4>
                    <div className="space-y-2">
                      <div className="relative">
                        <Input
                          value={searchValue}
                          onChange={onChange}
                          className="w-full pr-10"
                          placeholder={t("header.searchPlaceholder")}
                          onFocus={() => setIsSearchOpen(true)}
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>

                      {isSearchOpen && debouncedSearchValue && (
                        <Link
                          to={{
                            pathname: ROUTE_PATHS.BLOG.SEARCH,
                            search: new URLSearchParams({
                              query: debouncedSearchValue,
                            }).toString(),
                          }}
                          className="flex items-center gap-2 w-full p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsSearchOpen(false);
                          }}
                        >
                          <Search className="w-4 h-4" />
                          <span className="truncate">
                            {t("header.showResults", {
                              query: debouncedSearchValue,
                            })}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {t("mobileMenu.account")}
                  </h4>

                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={fullName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            target.nextElementSibling?.classList.remove(
                              "hidden"
                            );
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
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={handleLogout}
                      disabled={isLogoutPending}
                      className="flex items-center gap-3 w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="flex-1">{t("button.logout")}</span>
                      {isLogoutPending && (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
