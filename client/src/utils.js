export const stringPreview = (str) => {
  return str.length > 10 ? str.substring(0, 10) + "..." : str;
};
