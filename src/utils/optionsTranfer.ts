export const optionsTransfer = (value: number) => {
  return value === 0
    ? "A"
    : value === 1
    ? "B"
    : value === 2
    ? "C"
    : value === 3
    ? "D"
    : "";
};
