const STORE_NAME = "user";

const THEME = "theme";

const getUserSessionData = () => {
  const retrievedUser = localStorage.getItem(STORE_NAME);
  if (!retrievedUser) return;
  return JSON.parse(retrievedUser);
};

const setUserSessionData = (user) => {
  const storageValue = JSON.stringify(user);
  localStorage.setItem(STORE_NAME, storageValue);
};

const getTheme = () => {
  const theme = localStorage.getItem(THEME);
  if (!theme) return;
  return JSON.parse(theme);
};

const setTheme = (theme) => {
  const storageValue = JSON.stringify(theme);
  localStorage.setItem(THEME, storageValue);
};

const removeSessionData = () => {
  localStorage.removeItem(STORE_NAME);
  localStorage.removeItem(THEME);
};

export {
  getUserSessionData,
  setUserSessionData,
  removeSessionData,
  getTheme,
  setTheme,
};
