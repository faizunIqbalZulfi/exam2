import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const onLoginClick = (user, pass) => {
  return dispatch => {
    axios
      .get("http://localhost:1996/users", {
        params: {
          username: user,
          password: pass
        }
      })
      .then(res => {
        if (res.data.length > 0) {
          const { id, username, cart, password, email } = res.data[0];

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { id, username, cart }
          });
          cookies.set("username", username, { path: "/" });
        } else {
          dispatch({
            type: "AUTH_ERROR",
            payload: "Username And Password Not Match"
          });
          setTimeout(() => {
            dispatch({
              type: "SETTIMEOUT"
            });
          }, 2000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const onLogout = () => {
  cookies.remove("username");
  return {
    type: "LOGOUT_SUCCESS"
  };
};

export const onRegist = (user, email, pass) => {
  return dispatch => {
    axios
      .get("http://localhost:1996/users", {
        params: {
          username: user
        }
      })
      .then(res => {
        if (res.data.length === 0) {
          axios
            .post("http://localhost:1996/users", {
              username: user,
              email: email,
              password: pass
            })
            .then(res => {
              dispatch({
                type: "AUTH_SUCCESS",
                payload: "Registarion Success"
              });
              setTimeout(() => {
                dispatch({
                  type: "SETTIMEOUT"
                });
              }, 2000);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          dispatch({
            type: "AUTH_ERROR",
            payload: "Usernam Has Been Taken"
          });
          setTimeout(() => {
            dispatch({
              type: "SETTIMEOUT"
            });
          }, 2000);
        }
      });
  };
};

export const keepLogin = username => {
  return dispatch => {
    axios
      .get("http://localhost:1996/users", {
        params: {
          username
        }
      })
      .then(res => {
        if (res.data.length !== 0) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { username }
          });
        }
      });
  };
};
