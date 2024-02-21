import Cookies from 'universal-cookie';
import { AUTH_TOKEN } from './constants';

const cookies = new Cookies(null, { path: '/', maxAge: 31536000 });

export const getUserToken = () => {
      return cookies.get(AUTH_TOKEN)
}

export const setUserToken = (userToken) => {
      cookies.set(AUTH_TOKEN, userToken)
}

export const removeUserToken = () => {
      if (getUserToken())
            cookies.remove(AUTH_TOKEN)
}