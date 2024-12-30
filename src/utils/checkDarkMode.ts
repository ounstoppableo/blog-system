const checkDarkMode = () => {
  const local = localStorage.getItem('darkMode') as string;
  return JSON.parse(
    local
      ? local
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'true'
        : 'false',
  );
};
export default checkDarkMode;
