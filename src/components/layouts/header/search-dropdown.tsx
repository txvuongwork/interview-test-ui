import { Input } from "@/components";
import { ROUTE_PATHS } from "@/constants";
import { useSearch } from "@/hook";
import { useOnClickOutside } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRef, useState, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const SearchDropdown: FunctionComponent = () => {
  const { t } = useTranslation();
  const { searchValue, onChange, debouncedSearchValue } = useSearch();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useOnClickOutside(searchRef, () => setIsSearchOpen(false));

  return (
    <div className="relative w-96 hidden md:block" ref={searchRef}>
      <Input
        value={searchValue}
        onChange={onChange}
        className="w-full"
        placeholder={t("header.searchPlaceholder")}
        onFocus={() => setIsSearchOpen(true)}
      />

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
            className="absolute w-full p-1 bg-white -bottom-2 border border-gray-300 rounded-md left-0 translate-y-full shadow-lg z-10"
          >
            {debouncedSearchValue ? (
              <Link
                to={{
                  pathname: ROUTE_PATHS.POST.SEARCH,
                  search: new URLSearchParams({
                    query: debouncedSearchValue,
                  }).toString(),
                }}
                className="hover:bg-gray-100 flex items-center gap-2 w-full p-2 rounded-md duration-300"
              >
                <Search className="w-4 h-4" />
                <span>
                  {t("header.showResults", { query: debouncedSearchValue })}
                </span>
              </Link>
            ) : (
              <p className="text-gray-500 w-full p-2 rounded-md">
                {t("header.searchEmpty")}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
