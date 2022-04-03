import jwtDecode from "jwt-decode";
import { PAGE_HOME, PAGE_PROFILE } from "../config/constants";

export const callbackFinishLoad = () => {
  return new Promise((resolve) => setTimeout(() => resolve(false), 1500));
}

export const saveInLocalStoragge = (key: string, value: any) => {
  const data = typeof value === 'string' ? value : JSON.stringify(value);
  localStorage.setItem(key, data);
}

export const getItemLocalStoragge = (key: string) => {
  const data = localStorage.getItem(key)
  return data;
}

export const removeInLocalStoragge = (key: string) => {
  localStorage.removeItem(key)
}

export const redirectHome = () => {
  return window.location.href = PAGE_HOME
}

export const redirectProfile = () => {
  return window.location.href = PAGE_PROFILE
}

export const decodeToken = (token: string) => {
  return jwtDecode(token);
}

export const setDisplayName = (user: any) => {
  let name: string;
  if (user && user.name && user.lastName) {
    name = `${user.name} ${user.lastName}`;
  } else if (user && user.name) {
    name = `${user.name}`;
  } else if (user && user.userName) {
    name = `${user.userName}`;
  } else {
    name = 'NN';
  }

  return name;
}
