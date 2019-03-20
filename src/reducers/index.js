import { combineReducers } from "redux";
// import axios from "axios";

const init = {
  id: "",
  username: "",
  cart: [],
  error: "",
  success: ""
};

const AuthReducer = (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        cart: action.payload.cart
      };

    case "LOGOUT_SUCCESS":
      return { ...state, ...init };

    case "SETTIMEOUT":
      return { ...state, success: "", error: "" };

    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload,
        success: ""
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        error: "",
        success: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  auth: AuthReducer
  // cart: cartReducer
  // product: productsReducer
});
