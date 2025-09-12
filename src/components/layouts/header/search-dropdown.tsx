import { Input } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import { useSearch } from "@/hooks";
import { cn, useOnClickOutside } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRef, useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";

export const SearchDropdown: FunctionComponent = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { searchValue, onChange, debouncedSearchValue } = useSearch();

  const searchRef = useRef<HTMLDivElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useOnClickOutside(searchRef, () => setIsSearchOpen(false));

  const isSearchPage = location.pathname === ROUTE_PATHS.BLOG.SEARCH;

  return (
    <div
      className={cn("relative w-full max-w-xs lg:max-w-sm xl:max-w-md", {
        hidden: isSearchPage,
      })}
      ref={searchRef}
    >
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

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="absolute w-full min-w-[280px] max-w-[400px] p-1 bg-white -bottom-2 border border-gray-300 rounded-md left-0 translate-y-full shadow-lg z-50"
          >
            {debouncedSearchValue ? (
              <Link
                to={{
                  pathname: ROUTE_PATHS.BLOG.SEARCH,
                  search: new URLSearchParams({
                    query: debouncedSearchValue,
                  }).toString(),
                }}
                className="hover:bg-gray-100 flex items-center gap-2 w-full p-3 rounded-md duration-300 text-sm"
                onClick={() => setIsSearchOpen(false)}
              >
                <Search className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {t("header.showResults", { query: debouncedSearchValue })}
                </span>
              </Link>
            ) : (
              <p className="text-gray-500 w-full p-3 rounded-md text-sm">
                {t("header.searchEmpty")}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
