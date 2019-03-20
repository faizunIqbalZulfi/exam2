import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

import Checkout from "./Checkout";

const cookie = new Cookies();

class Cart extends React.Component {
  state = {
    cart: [],
    flag: false
  };

  componentDidMount() {
    // this.props.onAddCartClick();
    console.log(this.props.username);
    console.log(cookie.get("username"));

    this.getCart();
  }

  getCart = () => {
    axios
      .get("http://localhost:1996/carts", {
        params: {
          username: cookie.get("username")
        }
      })
      .then(res => {
        this.setState({ cart: res.data });
        console.log(this.state.cart);
      });
  };

  onMapCart = () => {
    return this.state.cart.map(item => {
      return (
        <tbody>
          <tr key={item.id}>
            <td>{item.productId}</td>

            <td>{item.name}</td>

            <td>{item.desc}</td>

            <td>{`Rp.${item.price.toLocaleString("IN")}`}</td>

            <td>
              <img className="list" src={item.src} alt={item.src} />
            </td>

            <td>{item.qty}</td>
            <td>
              <button
                //   hidden={!this.state.hidden}
                onClick={() => {
                  this.onDelete(item.id);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  onDelete = id => {
    axios.delete(`http://localhost:1996/carts/${id}`).then(() => {
      this.getCart();
    });
  };

  onCheckout = () => {
    this.setState({
      flag: !this.state.flag
    });
  };

  render() {
    console.log(cookie.get("username"));
    if (cookie.get("username") !== undefined) {
      if (this.state.cart.length !== 0) {
        return (
          <div className="container text-center">
            <h1 className="display-4 text-center">MY CART</h1>

            <table className="table table-hover mb-5">
              <thead>
                <tr>
                  <th scope="col">ID</th>

                  <th scope="col">NAME</th>

                  <th scope="col">DESC</th>

                  <th scope="col">PRICE</th>

                  <th scope="col">PICTURE</th>

                  <th scope="col">QUANTITY</th>

                  <th scope="col">ACTION</th>
                </tr>
              </thead>

              {this.onMapCart()}
            </table>
            <button
              className="btn btn-outline-success"
              onClick={() => {
                this.onCheckout();
              }}
            >
              Checkout
            </button>
            {this.state.flag ? <Checkout cart={this.state.cart} /> : null}
          </div>
        );
      } else {
        return (
          <div className="container text-center">
            <h1 className="display-3">Belanja dulu coy</h1>
          </div>
        );
      }
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};

export default connect(
  mapStateToProps
  //   { onAddCartClick }
)(Cart);
