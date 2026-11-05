import Cookies from 'universal-cookie';
import { AUTH_TOKEN } from './constants';

const cookies = new Cookies(null, { path: '/', maxAge: 31536000 });

export const getUserToken = (): string | null => {
  try {
    const localToken = localStorage.getItem(AUTH_TOKEN);
    if (localToken && localToken !== 'undefined' && localToken !== 'null') {
      return String(localToken);
    }
  } catch (_e) {
    // Fallback to cookie if localStorage is restricted
  }
  const cookieToken = cookies.get(AUTH_TOKEN);
  if (cookieToken && cookieToken !== 'undefined' && cookieToken !== 'null') {
    return String(cookieToken);
  }
  return null;
};

export const setUserToken = (userToken: string | number | null | undefined): void => {
  if (!userToken || userToken === 'undefined' || userToken === 'null') return;
  const tokenStr = String(userToken);
  try {
    localStorage.setItem(AUTH_TOKEN, tokenStr);
  } catch (_e) {
    // ignore localStorage write errors
  }
  cookies.set(AUTH_TOKEN, tokenStr, { path: '/', maxAge: 31536000, sameSite: 'lax' });
};

export const removeUserToken = (): void => {
  try {
    localStorage.removeItem(AUTH_TOKEN);
  } catch (_e) {
    // ignore localStorage remove errors
  }
  cookies.remove(AUTH_TOKEN, { path: '/' });
};
