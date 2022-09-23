export const generateId = () => {
  return (
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    Math.floor(Math.random() * Date.now())
      .toString()
      .substring(0, 4)
  );
};
