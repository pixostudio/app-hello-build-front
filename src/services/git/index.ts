import { apiProvider } from "../api/provider";

export default class GitService {

  // Requests

  static getReposOwner(id: any) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/git/owner-repos`;
    const body = {
      githubId: id
    };

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, body)
      .then((result: any) => {
        if (result.data) {
          resolve(result.data);
        } else {
          reject();
        }
      })
      .catch((er: any) => {
        reject(er);
      });
    });
  }

  static getReposFavs(id: any) {
    const urlBase = process.env.REACT_APP_URL_BACKEND;
    const url = `${urlBase}/git/favs-repos`;
    const body = {
      githubId: id
    };

    return new Promise(async (resolve, reject) => {
      await apiProvider.postRequest(url, body)
      .then((result: any) => {
        if (result.data) {
          resolve(result.data);
        } else {
          reject();
        }
      })
      .catch((er: any) => {
        reject(er);
      });
    });
  }

};