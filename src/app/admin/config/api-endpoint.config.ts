import { environment } from "../../environments/environment";

export const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINT = {
  auth: {
    base: API_BASE_URL,
    login: '/users/login',
  },
  category: {
    base: API_BASE_URL + '/' + 'categories',
    list: '/list',
    add: '/add',
  }, 
  user: {
    base: API_BASE_URL + '/' + 'users',
    list: '/list',
    add: '/add',
  },
  product: {
    base: API_BASE_URL + '/' + 'products',
    list: '/list',
    add: '/add',
  }
};