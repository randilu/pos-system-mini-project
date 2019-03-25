import axios from "axios";

const basePath = `http://localhost:5000/api/v1`;

//USER
export const GET_USERS = () => axios.get(`${basePath}/users`);
export const CREATE_USER = user => axios.post(`${basePath}/users`, user);
export const GET_USER_BY_ID = id => axios.get(`${basePath}/users/${id}`);
export const DELETE_USER = id => axios.delete(`${basePath}/users/${id}`);
export const UPDATE_USER = (id, user) =>
  axios.put(`${basePath}/users/${id}`, user);
export const AUTHENTICATE_USER = user =>
  axios.post(`${basePath}/users/auth`, user);

//ORDER
export const GET_ORDERS = () => axios.get(`${basePath}/orders`);
export const CREATE_ORDER = userId => axios.post(`${basePath}/orders`, userId);
export const GET_ORDER_BY_ID = id => axios.get(`${basePath}/orders/${id}`);
export const GET_ORDERS_BY_USER_ID = id =>
  axios.get(`${basePath}/orders/user/${id}`);
export const DELETE_ORDER = id => axios.delete(`${basePath}/orders/${id}`);
export const UPDATE_ORDER = (id, order) =>
  axios.put(`${basePath}/orders/${id}`, order);
export const ADD_ITEM_TO_ORDER = (id, itemId) =>
  axios.put(`${basePath}/orders/${id}/items`, itemId);

//ITEM
export const GET_ITEMS = () => axios.get(`${basePath}/items`);
export const CREATE_ITEM = item => axios.post(`${basePath}/items`, item);
export const GET_ITEM_BY_ID = id => axios.get(`${basePath}/items/${id}`);
export const DELETE_ITEM = id => axios.delete(`${basePath}/items/${id}`);
export const UPDATE_ITEM = (id, item) =>
  axios.put(`${basePath}/items/${id}`, item);
