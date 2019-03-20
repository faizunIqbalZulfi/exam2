import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ProductItem extends React.Component {
  state = {
    cart: [],
    quantity: 0,
    flag: false
  };

  // componentDidMount(){
  //   this.
  // }

  btnAddToCart = (id, qty) => {
    console.log(id);

    if (this.props.username !== "") {
      axios
        .get("http://localhost:1996/products", {
          params: {
            id
          }
        })
        .then(res => {
          axios
            .get("http://localhost:1996/carts", {
              params: {
                productId: id,
                username: this.props.username
              }
            })
            .then(resCart => {
              console.log(resCart.data.length);
              console.log(res.data.length);
              if (resCart.data.length === 0) {
                axios.post("http://localhost:1996/carts", {
                  username: this.props.username,
                  qty,
                  name: res.data[0].name,
                  desc: res.data[0].desc,
                  price: res.data[0].price,
                  src: res.data[0].src,
                  productId: res.data[0].id
                });
              } else {
                this.setState({ quantity: resCart.data[0].qty });
                axios.put(`http://localhost:1996/carts/${resCart.data[0].id}`, {
                  username: this.props.username,
                  qty: this.state.quantity + qty,
                  name: resCart.data[0].name,
                  desc: resCart.data[0].desc,
                  price: resCart.data[0].price,
                  src: resCart.data[0].src,
                  productId: resCart.data[0].productId
                });
              }
            });
        });
      // .then(res => {
      //   console.log(res.data[0].id);
      //   axios.get("http://localhost:1996/carts").then(resCart => {
      //     console.log(resCart.data.length);
      //     console.log(`ini id ${id} ini username ${this.props.username}`);

      //     if (
      //       // resCart.data.length === 0 ||
      //       resCart.data.findIndex(
      //         cart =>
      //           cart.productId === id && cart.username === this.props.username
      //       ) < 0
      //     ) {
      //       axios.post("http://localhost:1996/carts", {
      //         username: this.props.username,
      //         // id: this.props.id,
      //         qty,
      //         name: res.data[0].name,
      //         desc: res.data[0].desc,
      //         price: res.data[0].price,
      //         src: res.data[0].src,
      //         productId: res.data[0].id
      //       });
      //     } else {
      //       axios
      //         .get(`http://localhost:1996/carts`, {
      //           params: {
      //             productId: id
      //           }
      //         })
      //         .then(res => {
      //           console.log(res.data[0].productId);
      //           this.setState({ quantity: res.data[0].qty });
      //           axios
      //             .put(`http://localhost:1996/carts/${res.data[0].id}`, {
      //               username: this.props.username,
      //               qty: this.state.quantity + qty,
      //               name: res.data[0].name,
      //               desc: res.data[0].desc,
      //               price: res.data[0].price,
      //               src: res.data[0].src,
      //               productId: res.data[0].productId
      //             })
      //             .then(() => {
      //               this.setState({ quantity: 0 });
      //             });
      //         });
      //     }
      //   });
      // });
      // }
    } else {
      console.log("login dulu");
      this.setState({
        flag: !this.state.flag
      });
    }
  };
  render() {
    const { item } = this.props;

    return (
      <div className="card col-3 m-4" style={{ width: "18rem" }} key={item.id}>
        <img src={item.src} className="mx-auto" alt={item.name} />

        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>

          {/* <p className="card-text">{item.desc}</p> */}

          <p className="card-text">{`Rp.${item.price.toLocaleString("IN")}`}</p>

          <input
            className="form-control"
            type="number"
            ref={input => {
              this.qty = input;
            }}
            defaultValue={1}
          />

          <Link to={`/detailproduct/${item.id}`}>
            <button className="btn btn-secondary btn-block btn-sm my-2">
              Detail
            </button>
          </Link>

          <button
            onClick={() => {
              this.btnAddToCart(item.id, parseInt(this.qty.value));
            }}
            className="btn btn-primary btn-block btn-sm my-2"
          >
            Add to Cart
          </button>
          {this.state.flag ? <Redirect to="/login" /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { username: state.auth.username };
};

export default connect(mapStateToProps)(ProductItem);
