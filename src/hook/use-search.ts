import { useCallback, useState, type ChangeEvent } from "react";
import { useDebounceValue } from "usehooks-ts";

export const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebounceValue(
    searchValue,
    500
  );

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setDebouncedSearchValue(e.target.value);
    },
    [setDebouncedSearchValue]
  );

  return {
    searchValue,
    debouncedSearchValue,
    onChange,
  };
};
