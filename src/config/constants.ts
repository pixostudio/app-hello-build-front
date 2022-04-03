import Logo from '../media/logo.png';

/* Navigation */
export const ROOT = "/";
export const PAGE_HOME = "/home";
export const PAGE_SIGIN = "/iniciar-sesion";
export const PAGE_SIGNUP = "/registrarse";
export const PAGE_LOGOUT = "/logout";
export const PAGE_PROFILE = "/perfil";

/* Images */
export const IMG_LOGO = Logo;

/* Menu */
export const MENU_NOT_SESSION = [
  { id: 1, link: PAGE_HOME, title: 'Inicio' },
  { id: 2, link: PAGE_SIGIN, title: 'Iniciar Sesión' },
  { id: 3, link: PAGE_SIGNUP, title: 'Registro' },
];

export const MENU_SESSION = [
  { id: 1, link: PAGE_HOME, title: 'Inicio' },
  { id: 2, link: PAGE_PROFILE, title: 'Perfil' },
  { id: 3, link: PAGE_LOGOUT, title: 'Cerrar Sesión' },
];

/* Creador */
export const CREATOR = { id: 1, name: "Camilo Garzón", email: 'kmilogarzonk@hotmail.com' };

/* Forms Validators */
export const VAL_NAME = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
export const VAL_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const VAL_USERNAME = /^[a-zA-Z0-9_.+-]+$/;

/* LocalStoragge */
export const LS_ACCESS_TOKEN = "accessToken";
export const LS_REFRESH_TOKEN = "refreshToken";
export const LS_IS_LOGGEDIN = "isLoggedin";
