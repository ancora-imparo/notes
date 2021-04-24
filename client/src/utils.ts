export const stringPreview = (str: string): string => {
  return str.length > 10 ? str.substring(0, 10) + "..." : str;
};
