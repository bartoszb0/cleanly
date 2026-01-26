export const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const constrained = digits.slice(0, 9);

  if (constrained.length <= 3) return constrained;
  if (constrained.length <= 6) {
    return `${constrained.slice(0, 3)} ${constrained.slice(3)}`;
  }
  return `${constrained.slice(0, 3)} ${constrained.slice(3, 6)} ${constrained.slice(6)}`;
};
