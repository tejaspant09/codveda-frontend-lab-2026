export function validate(name, value) {
  const trimmed = value.trim();
  if (name === "name") {
    return [...trimmed].length >= 2 ? "" : "Enter at least two characters.";
  }
  if (name === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
      ? ""
      : "Enter a valid email address.";
  }
  if (name === "phone") {
    const digits = (trimmed.match(/\d/g) || []).length;
    return /^[+()\d\s-]+$/.test(trimmed) && digits >= 7 && digits <= 15
      ? ""
      : "Enter a phone number with 7–15 digits.";
  }
  if (name === "password") {
    return value.length >= 8 && /[a-z]/i.test(value) && /\d/.test(value)
      ? ""
      : "Use at least 8 characters, including a letter and a number.";
  }
  return "";
}

export function strength(value) {
  if (!value) return "not entered";
  const score =
    Number(value.length >= 8) +
    Number(value.length >= 12) +
    Number(/[a-z]/i.test(value)) +
    Number(/\d/.test(value)) +
    Number(/[^a-z\d]/i.test(value));
  return score >= 5 ? "strong" : score >= 3 ? "moderate" : "weak";
}
