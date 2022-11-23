export const capitalizeFirstLetter = (s: string) => {
  if (s.length == 0) {
    return "";
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
};
