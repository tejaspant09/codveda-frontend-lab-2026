import { describe, it, expect } from "vitest";
import { validate, strength } from "../level-1/form/logic.js";
import { changeCount } from "../level-1/counter/logic.js";

describe("form validation", () => {
  it("accepts Unicode names and rejects short or blank names", () => {
    expect(validate("name", " A ")).not.toBe("");
    expect(validate("name", "  ")).not.toBe("");
    expect(validate("name", "李明")).toBe("");
    expect(validate("name", "😀")).not.toBe("");
  });

  it("accepts surrounding email whitespace but rejects internal whitespace", () => {
    expect(validate("email", " ada@example.com ")).toBe("");
    expect(validate("email", "ada @example.com")).not.toBe("");
    expect(validate("email", "ada@")).not.toBe("");
  });

  it("accepts formatted phone numbers but rejects letters and invalid lengths", () => {
    expect(validate("phone", "+1 (555) 123-4567")).toBe("");
    expect(validate("phone", "123")).not.toBe("");
    expect(validate("phone", "1234567x")).not.toBe("");
    expect(validate("phone", "1234567890123456")).not.toBe("");
  });

  it("checks password requirements and strength", () => {
    expect(validate("password", "abcdefgh")).not.toBe("");
    expect(validate("password", "abc12345")).toBe("");
    expect(strength("")).toBe("not entered");
    expect(strength("longerPassword123!")).toBe("strong");
  });
});

describe("counter", () => {
  it("changes the count without falling below zero", () => {
    expect(changeCount(0, -1)).toBe(0);
    expect(changeCount(3, -1)).toBe(2);
    expect(changeCount(2, 1)).toBe(3);
  });
});
