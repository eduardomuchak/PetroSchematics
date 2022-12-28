import axios from 'axios';

const urlAPI = `${process.env.REACT_APP_URL_ENDPOINT_BACKEND}`;

export const api = axios.create({
  baseURL: urlAPI,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.clear();
      window.location.assign('/');
    }
  },
);

export const token = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
  },
});

export const tokenFile = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('@Origem:token')}`,
    'Content-Type': 'multipart/form-data',
  },
});
