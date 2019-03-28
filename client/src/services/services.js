import axios from "axios";

const basePath = `http://localhost:5000/api/v1`;

export const config = token => ({
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": `${token}`
  }
});

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
export const GET_ORDERS = token =>
  axios.get(`${basePath}/orders`, config(token));
export const CREATE_ORDER = (userId, token) =>
  axios.post(`${basePath}/orders`, userId, config(token));
export const GET_ORDER_BY_ID = (id, token) =>
  axios.get(`${basePath}/orders/${id}`, config(token));
export const GET_ORDERS_BY_USER_ID = (id, token) =>
  axios.get(`${basePath}/orders/user/${id}`, config(token));
export const DELETE_ORDER = (id, token) =>
  axios.delete(`${basePath}/orders/${id}`, config(token));
export const UPDATE_ORDER = (id, order, token) =>
  axios.put(`${basePath}/orders/${id}`, order, config(token));
export const ADD_ITEM_TO_ORDER = (id, itemId, token) =>
  axios.put(`${basePath}/orders/${id}/items`, itemId, config(token));

//ITEM
export const GET_ITEMS = token => axios.get(`${basePath}/items`, config(token));
export const CREATE_ITEM = (item, token) =>
  axios.post(`${basePath}/items`, item, config(token));
export const GET_ITEM_BY_ID = (id, token) =>
  axios.get(`${basePath}/items/${id}`, config(token));
export const DELETE_ITEM = (id, token) =>
  axios.delete(`${basePath}/items/${id}`, config(token));
export const UPDATE_ITEM = (id, item, token) =>
  axios.put(`${basePath}/items/${id}`, item, config(token));
