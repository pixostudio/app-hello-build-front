import jwtDecode from "jwt-decode";
import { LS_ACCESS_TOKEN, LS_REFRESH_TOKEN } from "../../config/constants";
import { apiProvider } from "../api/provider";
import { IDataUser, IDataUserLogin, IDataUserToken } from "../user/model";
import { getItemLocalStoragge, removeInLocalStoragge, saveInLocalStoragge } from "../utils";

export default class AuthService {
  
  static accessToken: string | null;
  static refreshToken: string | null;

  // Get and Set values

  static getAccessToken() {
    return this.accessToken;
  }
  
  static setAccessToken(param: string = "") {
    this.accessToken = param ? param : getItemLocalStoragge(LS_ACCESS_TOKEN);
  }

  static getRefreshToken() {
    return this.refreshToken;
  }
  
  static setRefreshToken(param: string = "") {
    this.refreshToken = param ? param : getItemLocalStoragge(LS_REFRESH_TOKEN);
  }

  static setSession(data: any) {
    saveInLocalStoragge(LS_ACCESS_TOKEN, data.token.accessToken);
    this.setAccessToken(data.token.accessToken);
    saveInLocalStoragge(LS_REFRESH_TOKEN, data.token.refreshToken);
    this.setRefreshToken(data.token.refreshToken);
  }

  static setEndSession() {
    removeInLocalStoragge(LS_ACCESS_TOKEN);
    this.setAccessToken("");
    removeInLocalStoragge(LS_REFRESH_TOKEN);
    this.setRefreshToken("");
  }

  static setTokens(data: IDataUserToken) {
    const { accessToken, refreshToken } = data;
    saveInLocalStoragge(LS_ACCESS_TOKEN, accessToken);
    this.setAccessToken(accessToken);
    saveInLocalStoragge(LS_REFRESH_TOKEN, refreshToken);
    this.setRefreshToken(refreshToken);
  }


  // Validates

  static validateSession() {
    const log = getItemLocalStoragge(LS_ACCESS_TOKEN);
    if (log) {
      this.setAccessToken();
      this.setRefreshToken();
    }
  }

  static willExpireToken(token: string) {
    const secs = 60;
    const metaToken: any = jwtDecode(token);
    const { exp } = metaToken;
    const now = (Date.now() + secs) / 1000;

    return now > exp;
  }

  static expireAccessToken() {
    if (!this.accessToken || this.accessToken === 'null') {
      return null;
    }

    return this.willExpireToken(this.accessToken) ? null : this.accessToken;
  }

  static expireRefreshToken() {
    if (!this.refreshToken || this.refreshToken === 'null') {
      return null;
    }

    return this.willExpireToken(this.refreshToken) ? null : this.refreshToken;
  }

  // Requests

  static signUp(body: IDataUser) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/signup/`;

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, body)
      .then((result: any) => {
        const data = result.data;
        this.setSession(data);
        resolve(result);
      })
      .catch((er: any) => {
        reject(er);
      });
    });
  }

  static signIn(body: IDataUserLogin) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/signin/`;

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, body)
      .then((result: any) => {
        if (result.data) {
          const data = result.data;
          this.setSession(data);
          resolve(data);
        } else {
          reject();
        }
      })
      .catch((er: any) => {
        reject(er);
      });
    });
  }

  static refreshAccessToken(refreshToken: string) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/refresh-token/`;
    const body = { refreshToken }

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, body)
      .then((result: any) => {
        if (result.data) {
          const data = result.data;
          this.setTokens(data.token);
          resolve(data);
        } else {
          this.setEndSession();
          reject();
        }
      })
      .catch((er: any) => {
        this.setEndSession();
        reject(er);
      });
    });
  }

  static signWithGitHub(codeAuth: any) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/oauth-github/`;

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, codeAuth)
      .then((result: any) => {
        if (result.data) {
          const data = result.data;
          this.setSession(data);
          resolve(data);
        } else {
          reject();
        }
      })
      .catch((er: any) => {
        reject(er);
      });
    });
  }

  static logout() {
    this.setEndSession();
  }

};