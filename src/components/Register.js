import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { onRegist } from "../actions";

class Register extends Component {
  onRegistClick = () => {
    const user = this.username.value;
    const email = this.email.value;
    const pass = this.password.value;

    console.log(user);
    console.log(email);
    console.log(pass);
    this.props.onRegist(user, email, pass);
  };

  onRegistError = () => {
    if (this.props.error !== "") {
      // setTimeout(this.props.onSetTimeOut, 2000);
      return (
        <div className="alert alert-danger mt-2" role="alert">
          {this.props.error}
        </div>
      );
    } else if (this.props.success !== "") {
      // setTimeout(this.props.onSetTimeOut, 2000);
      return (
        <div>
          {/* {this.props.success} */}
          <Redirect to="/login" />
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    if (this.props.username === "") {
      return (
        <div>
          <div className="mt-5 row">
            <div className="col-sm-3 mx-auto card">
              <div className="card-body">
                <div className="border-bottom border-secondary card-title">
                  <h1>Register</h1>
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
                  <h4>E-mail</h4>
                </div>
                <form className="input-group">
                  <input
                    ref={input => {
                      this.email = input;
                    }}
                    className="form-control"
                    type="email"
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
                  onClick={this.onRegistClick}
                >
                  Register
                </button>
                {this.onRegistError()}
                {/* {this.onRegistSuccess()} */}
                <p className="lead">
                  Do you have account ? <Link to="/login">Sign In!</Link>
                </p>
              </div>
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
  return {
    username: state.auth.username,
    error: state.auth.error,
    success: state.auth.success
  };
};

export default connect(
  mapStateToProps,
  { onRegist }
)(Register);
