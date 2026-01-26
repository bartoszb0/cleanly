export const formatPostCode = (value: string): string => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  // Limit to 5 digits
  const constrained = digits.slice(0, 5);

  // Apply mask: 00-000
  if (constrained.length > 2) {
    return `${constrained.slice(0, 2)}-${constrained.slice(2)}`;
  }

  return constrained;
};
