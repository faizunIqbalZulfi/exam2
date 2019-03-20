import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
// import AllProduct from "./AllProduct";
import ManageProduct from "./ManageProduct";
import DetailProduct from "./DetailProduct";
import Cart from "./Cart";
import { keepLogin } from "../actions";

const cookies = new Cookies();

class App extends Component {
  componentDidMount() {
    // console.log(cookies.get("username"));
    var username = cookies.get("username");
    if (username !== undefined) {
      // console.log("cookie");

      this.props.keepLogin(username);
    }
  }

  // userLogin = () => {
  //   if (this.props.username !== "") {
  //     return <Route path="/manageproduct" component={ManageProduct} />;
  //   }
  //   // else {
  //   //   return (
  //   //     <div>
  //   //       <Route path="/login" component={Login} />
  //   //       <Route path="/register" component={Register} />
  //   //     </div>
  //   //   );
  //   // }
  // };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/manageproduct" component={ManageProduct} />
          {/* <Route path="/" component={AllProduct} /> */}
          <Route path="/cart" component={Cart} />
          <Route path="/detailproduct/:product_id" component={DetailProduct} />

          {/* {this.userLogin()} */}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};
export default connect(
  mapStateToProps,
  { keepLogin }
)(App);
