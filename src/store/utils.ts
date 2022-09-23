export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
