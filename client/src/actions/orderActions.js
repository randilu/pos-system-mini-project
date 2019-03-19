import axios from "axios";
import {GET_ORDERS, ADD_ORDER, DELETE_ORDER, ORDERS_LOADING} from "./types";

export const getOrders = () => dispatch => {
    dispatch(setOrdersLoading());
    axios
        .get("api/v1/orders")
        .then(res =>
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            })
        );
};

export const deleteOrder = id => dispatch => {
    axios.delete(`/api/v1/orders/${id}`).then(res =>
        dispatch({
            type: DELETE_ORDER,
            payload: id
        })
    );
};

export const addOrder = order => dispatch => {
    dispatch(setOrdersLoading());
    axios.post("api/v1/orders", order)
        .then(res =>
            dispatch({
                type: ADD_ORDER,
                payload: res.data
            })
        );
};

export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    };
};
