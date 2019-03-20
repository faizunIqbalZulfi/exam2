import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import axios from 'axios'
import { onLoginClick } from "../actions";

class Login extends Component {
  // state = {term:[]}
  onSubmitClick = () => {
    const user = this.username.value;
    const pass = this.password.value;
    // console.log(user);
    // console.log(pass);
    this.props.onLoginClick(user, pass);
  };

  onLoginError = () => {
    if (this.props.user.error !== "") {
      // setTimeout(this.props.onSetTimeOut, 2000);
      return (
        <div className="alert alert-danger mt-2" role="alert">
          {this.props.user.error}
        </div>
      );
    } else if (this.props.user.success !== "") {
      return (
        <div className="alert alert-success mt-2" role="alert">
          {this.props.user.success}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    console.log(this.props.user.username);

    if (this.props.user.username === "") {
      return (
        <div className="mt-5 row">
          <div className="col-sm-3 mx-auto card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title">
                <h1>Login</h1>
              </div>
              <div className="card-title mt-1">
                <h4>Username</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.username = input;
                  }}
                  className="form-control"
                  type="text"
                />
              </form>
              <div className="card-title mt-1">
                <h4>Password</h4>
              </div>
              <form className="input-group">
                <input
                  ref={input => {
                    this.password = input;
                  }}
                  className="form-control"
                  type="password"
                />
              </form>
              <button
                className="btn btn-success btn-block mt-5"
                onClick={this.onSubmitClick}
              >
                Login
              </button>

              {this.onLoginError()}
              <p className="lead">
                Don't have account ? <Link to="/register">Sign Up!</Link>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { onLoginClick }
)(Login);
