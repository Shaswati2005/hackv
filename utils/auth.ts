// utils/auth.ts
export const setAuthCookie = (token: string) => {
  document.cookie = `authToken=${token}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
};


export const getAuthCookie = () => {
  const value = `; ${document.cookie}`;
  console.log(value);
  const parts = value.split(`; authToken=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};


export const clearAuthCookie = () => {
  document.cookie = `authToken=; path=/; max-age=0`;
};
