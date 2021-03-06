import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { onLogout } from "../actions";

class Header extends Component {
  onLogoutUser = () => {
    this.props.onLogout();
  };

  render() {
    const { username } = this.props.user;
    if (username === "") {
      return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light sticky-top mb-3">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <i class="fas fa-shoe-prints" />
              Brand<b>Name</b>
            </Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav2"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse p-2" id="navbarNav2">
              {/* <form className="input-group col-12 col-md-7 ml-auto">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </form> */}
              <ul className="navbar-nav ml-auto">
                <li className="nav-item mt-2">
                  <Link className="nav-a" to="/">
                    All Product
                  </Link>
                </li>

                <li className="nav-item m-1">
                  <Link className="nav-a" to="/register">
                    <button className="btn btn-primary">Register</button>
                  </Link>
                </li>
                <li className="nav-item m-1">
                  <Link className="nav-a" to="/login">
                    <button className="btn btn-success">Login</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          {/* <Redirect to="/" /> */}
          <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light mb-3">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <i class="fas fa-shoe-prints" />
                Brand<b>Name</b>
              </Link>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarNav2"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse p-2" id="navbarNav2">
                {/* <form className="input-group col-12 col-md-7 ml-auto">
                  <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search"
                  />
                  <button className="btn btn-outline-success">Search</button>
                </form> */}
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item mt-2">
                    <Link className="nav-link" to="/">
                      All Product
                    </Link>
                  </li>
                  <li className="nav-item dropdown mt-2">
                    <Link
                      to="/"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Hallo {username}
                    </Link>
                    <div className="dropdown-menu">
                      <Link to="/manageproduct" className="dropdown-item">
                        Manage Product
                      </Link>
                      <Link to="/cart" className="dropdown-item">
                        Cart
                      </Link>
                      <button
                        onClick={this.onLogoutUser}
                        className="dropdown-item"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                  {/* <li className="nav-item m-1">
                                    <Link className="nav-link" to="/register"><button className="btn btn-primary">Register</button></Link>
                                </li>
                                <li className="nav-item m-1">
                                    <Link className="nav-link" to="/login"><button className="btn btn-success">Login</button></Link>
                                </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { onLogout }
)(Header);
