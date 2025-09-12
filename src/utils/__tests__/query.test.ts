import { describe, it, expect } from "vitest";
import { queryUtils } from "../query";
import type { TListResponse, TResponse } from "@/types";
import type { InfiniteData } from "@tanstack/react-query";

// Mock types for testing
interface TestItem {
  id: number;
  name: string;
}

type TestResponse = TResponse<TListResponse<TestItem>>;
type TestInfiniteData = InfiniteData<TestResponse, unknown>;

describe("queryUtils", () => {
  describe("flattenData", () => {
    it("should return empty array when data is undefined", () => {
      const result = queryUtils.flattenData(undefined);
      expect(result).toEqual([]);
    });

    it("should return empty array when data is null", () => {
      const result = queryUtils.flattenData(null as any);
      expect(result).toEqual([]);
    });

    it("should flatten successful pages correctly", () => {
      const mockData: TestInfiniteData = {
        pages: [
          {
            ok: true,
            body: {
              items: [
                { id: 1, name: "Item 1" },
                { id: 2, name: "Item 2" },
              ],
              currentPage: 0,
              totalPages: 2,
              totalElements: 4,
              pageSize: 2,
            },
          },
          {
            ok: true,
            body: {
              items: [
                { id: 3, name: "Item 3" },
                { id: 4, name: "Item 4" },
              ],
              currentPage: 1,
              totalPages: 2,
              totalElements: 4,
              pageSize: 2,
            },
          },
        ],
        pageParams: [0, 1],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
      ]);
    });

    it("should handle failed pages by returning empty items", () => {
      const mockData: TestInfiniteData = {
        pages: [
          {
            ok: true,
            body: {
              items: [
                { id: 1, name: "Item 1" },
                { id: 2, name: "Item 2" },
              ],
              currentPage: 0,
              totalPages: 2,
              totalElements: 4,
              pageSize: 2,
            },
          },
          {
            ok: false,
            error: {
              message: "Server Error",
              status: 500,
            },
          },
        ],
        pageParams: [0, 1],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
      ]);
    });

    it("should handle mixed successful and failed pages", () => {
      const mockData: TestInfiniteData = {
        pages: [
          {
            ok: false,
            error: {
              message: "Server Error",
              status: 500,
            },
          },
          {
            ok: true,
            body: {
              items: [
                { id: 3, name: "Item 3" },
                { id: 4, name: "Item 4" },
              ],
              currentPage: 1,
              totalPages: 3,
              totalElements: 4,
              pageSize: 2,
            },
          },
          {
            ok: false,
            error: {
              message: "Not Found",
              status: 404,
            },
          },
        ],
        pageParams: [0, 1, 2],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 4" },
      ]);
    });

    it("should handle empty pages array", () => {
      const mockData: TestInfiniteData = {
        pages: [],
        pageParams: [],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([]);
    });

    it("should handle pages with empty items", () => {
      const mockData: TestInfiniteData = {
        pages: [
          {
            ok: true,
            body: {
              items: [],
              currentPage: 0,
              totalPages: 1,
              totalElements: 0,
              pageSize: 10,
            },
          },
        ],
        pageParams: [0],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([]);
    });

    it("should preserve item order across pages", () => {
      const mockData: TestInfiniteData = {
        pages: [
          {
            ok: true,
            body: {
              items: [{ id: 1, name: "First" }],
              currentPage: 0,
              totalPages: 3,
              totalElements: 3,
              pageSize: 1,
            },
          },
          {
            ok: true,
            body: {
              items: [{ id: 2, name: "Second" }],
              currentPage: 1,
              totalPages: 3,
              totalElements: 3,
              pageSize: 1,
            },
          },
          {
            ok: true,
            body: {
              items: [{ id: 3, name: "Third" }],
              currentPage: 2,
              totalPages: 3,
              totalElements: 3,
              pageSize: 1,
            },
          },
        ],
        pageParams: [0, 1, 2],
      };

      const result = queryUtils.flattenData(mockData);

      expect(result).toEqual([
        { id: 1, name: "First" },
        { id: 2, name: "Second" },
        { id: 3, name: "Third" },
      ]);
    });
  });
});
