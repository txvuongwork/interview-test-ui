import { Button, Input, Label } from "@/components";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState, useEffect, type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface BlogSearchFilterProps {
  onSearch: (searchQuery: string, sortBy: string) => void;
  onReset: () => void;
  initialSearchQuery?: string;
  initialSortBy?: string;
}

export const BlogSearchFilter: FunctionComponent<BlogSearchFilterProps> = ({
  onSearch,
  onReset,
  initialSearchQuery = "",
  initialSortBy = "created_date",
}) => {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);

  const sortOptions = [
    {
      value: "created_date",
      label: t("blog.search.select.option.createdDate"),
    },
    {
      value: "created_date_asc",
      label: t("blog.search.select.option.createdDateAsc"),
    },
  ];

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    setSortBy(initialSortBy);
  }, [initialSortBy]);

  return (
    <div className="w-full  lg:w-1/3 h-fit lg:sticky lg:top-5 bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-y-auto custom-scrollbar-hover">
      <div className="mb-6">
        <Label
          htmlFor="search-input"
          className="text-sm font-medium text-gray-700 mb-3 block"
        >
          {t("blog.search.input.title")}
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("blog.search.input.placeholder")}
            className="w-full pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-md"
          />
        </div>
      </div>

      <div className="mb-8">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          {t("blog.search.select.title")}
        </Label>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md border border-gray-200 cursor-pointer duration-300",
                sortBy === option.value && "border-postvibe-purple"
              )}
            >
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={sortBy === option.value}
                onChange={() => setSortBy(option.value)}
                className="w-4 h-4"
              />
              <span
                className={cn("text-sm text-gray-700 duration-300", {
                  "text-postvibe-purple": sortBy === option.value,
                })}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          onClick={() => onSearch(searchQuery, sortBy)}
          className="flex-1"
        >
          {t("button.search")}
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setSearchQuery("");
            setSortBy("created_date");
            onReset();
          }}
          variant="outline"
          className="flex-1"
        >
          {t("button.reset")}
        </Button>
      </div>
    </div>
  );
};
