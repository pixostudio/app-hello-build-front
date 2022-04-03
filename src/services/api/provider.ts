import axios from 'axios';

const axiosClient: any = axios.create();
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: '*/*'
};
axiosClient.defaults.timeout = 2000;

export const apiProvider = {

  getRequest : async (URL: string): Promise<any> => {
    let responseRequest: Object;
    let errorRequest: Object;

    await axiosClient.get(`${URL}`)
      .then((response: any) => responseRequest = response)
      .catch((error: any) => errorRequest = error)

    return new Promise((resolve, reject) => {
      if (responseRequest !== null) {
        resolve(responseRequest);
      } else {
        reject(errorRequest);
      }
    });
  },

  postRequest : async (URL: string, body: Object): Promise<any> => {
    let responseRequest: Object;
    let errorRequest: Object;
    await axiosClient.post(`${URL}`, body)
      .then((response: any) => {
        responseRequest = response
      })
      .catch((error: any) => {
        errorRequest = error
      })

    return new Promise((resolve, reject) => {
      if (responseRequest !== null) {
        resolve(responseRequest);
      } else {
        reject(errorRequest);
      }
    });
  },
  
};