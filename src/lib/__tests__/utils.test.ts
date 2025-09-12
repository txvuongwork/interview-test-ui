import { describe, expect, it } from "vitest";
import { cn, formatWithDateFns } from "../utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle undefined and falsy values", () => {
    expect(cn("class1", undefined, "class2")).toBe("class1 class2");
    expect(cn("class1", false && "class2", "class3")).toBe("class1 class3");
    expect(cn("class1", null, "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe(
      "base active"
    );
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("text-red-500 text-blue-500")).toBe("text-blue-500");
  });
});

describe("formatWithDateFns", () => {
  it("should format date with default format", () => {
    const date = new Date("2025-01-15T10:30:00Z");
    const result = formatWithDateFns(date);
    // The exact format depends on DATE_FORMATS.DEFAULT
    expect(result).toBeDefined();
    expect(typeof result).toBe("string");
  });

  it("should format date with custom format", () => {
    const date = new Date("2025-01-15T10:30:00Z");
    const result = formatWithDateFns(date, "yyyy-MM-dd");
    expect(result).toBe("2025-01-15");
  });

  it("should format date with time format", () => {
    const date = new Date("2025-01-15T10:30:00");
    const result = formatWithDateFns(date, "HH:mm:ss");
    expect(result).toBe("10:30:00");
  });

  it("should handle different date formats", () => {
    const date = new Date("2025-12-25T15:45:30");

    expect(formatWithDateFns(date, "dd/MM/yyyy")).toBe("25/12/2025");
    expect(formatWithDateFns(date, "MMM dd, yyyy")).toBe("Dec 25, 2025");
    expect(formatWithDateFns(date, "EEEE, MMMM do, yyyy")).toBe(
      "Thursday, December 25th, 2025"
    );
  });
});
