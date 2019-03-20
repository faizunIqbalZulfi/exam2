import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class ManageProduct extends Component {
  _isMounted = false;
  state = {
    products: [],
    hidden: true,
    id: 0
  };

  componentDidMount() {
    this._isMounted = true;
    console.log("didmount");

    this.getProduct();
  }
  componentWillUnmount() {
    console.log("willunmount");
    this._isMounted = false;
  }

  getProduct = () => {
    axios
      .get("http://localhost:1996/products")

      .then(res => {
        if (this._isMounted) {
          this.setState({ products: res.data });
        }
      });
  };

  deleteProduct = id => {
    axios.delete(`http://localhost:1996/products/${id}`).then(() => {
      this.getProduct();
    });
  };

  addProduct = () => {
    const name = this.name.value;
    const desc = this.desc.value;
    const price = parseInt(this.price.value);
    const src = this.src.value;

    axios
      .post("http://localhost:1996/products", {
        name,
        desc,
        price,
        src
      })
      .then(() => {
        this.getProduct();
      });
  };

  onEditProduct = id => {
    // if (this.state.hidden == true) {
    //   this.setState({ hidden: false });
    // }

    this.setState({
      id: id
    });

    console.log(this.state.id);
  };

  onOkeProduct = id => {
    console.log(this.state.id);
    const name = this.nameEdit.value;
    const desc = this.descEdit.value;
    const price = parseInt(this.priceEdit.value);
    const src = this.srcEdit.value;
    axios.get(`http://localhost:1996/products/${id}`).then(res => {
      axios
        .put(`http://localhost:1996/products/${id}`, {
          name,
          desc,
          price,
          src
        })
        .then(() => {
          this.getProduct();
        });
      // }
    });

    // this.nameEdit.value = "";
    // this.descEdit.value = "";
    // this.priceEdit.value = "";
    // this.srcEdit.value = "";

    this.setState({ id: 0 });

    // if (this.state.hidden == false) {
    //   this.setState({ hidden: true });
    // }
  };

  renderList = () => {
    return this.state.products.map(item => {
      if (this.state.id !== item.id) {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>

            <td>{item.name}</td>

            <td>{item.desc}</td>

            <td>{`Rp.${item.price.toLocaleString("IN")}`}</td>

            <td>
              <img className="list" src={item.src} alt={item.src} />
            </td>

            <td>
              <a href="#addProduct">
                <button
                  hidden={!this.state.hidden}
                  onClick={() => {
                    this.onEditProduct(item.id);
                  }}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </button>
              </a>

              <button
                hidden={!this.state.hidden}
                onClick={() => {
                  this.deleteProduct(item.id);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{item.id}</td>

            <td scope="col">
              <input
                ref={input => (this.nameEdit = input)}
                className="form-control"
                type="text"
                defaultValue={item.name}
              />
            </td>

            <td scope="col">
              <input
                ref={input => (this.descEdit = input)}
                className="form-control"
                type="text"
                defaultValue={item.desc}
              />
            </td>

            <td scope="col">
              <input
                ref={input => (this.priceEdit = input)}
                className="form-control"
                type="text"
                defaultValue={item.price}
              />
            </td>

            <td scope="col">
              <input
                ref={input => (this.srcEdit = input)}
                className="form-control"
                type="text"
                defaultValue={item.src}
              />
            </td>

            <td scope="col">
              <button
                onClick={() => {
                  this.onOkeProduct(this.state.id);
                }}
                className="btn btn-outline-warning"
              >
                Save
              </button>
              <button
                onClick={() => {
                  this.setState({ id: 0 });
                }}
                className="btn btn-outline-warning"
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }
    });
  };

  render() {
    console.log(cookies.get("username"));

    if (cookies.get("username") !== undefined) {
      return (
        <div className="container">
          <h1 className="display-4 text-center">Manage Product</h1>

          <table className="table table-hover mb-5">
            <thead>
              <tr>
                <th scope="col">ID</th>

                <th scope="col">NAME</th>

                <th scope="col">DESC</th>

                <th scope="col">PRICE</th>

                <th scope="col">PICTURE</th>

                <th scope="col">ACTION</th>
              </tr>
            </thead>

            <tbody>{this.renderList()}</tbody>
          </table>

          {/* <div hidden={this.state.hidden}>
          <h1 className="display-4 text-center">{`Edit Product ID ${
            this.state.id
          }`}</h1>
          <table className="table text-center">
          <thead>
          <tr>
          <th scope="col">NAME</th>
          
          <th scope="col">DESC</th>
          
          <th scope="col">PRICE</th>
          
          <th scope="col">PICTURE</th>
          
          <th scope="col">ACTION</th>
              </tr>
              </thead>

              <tbody id="addProduct">
              <tr>
              <th scope="col">
              <input
              ref={input => (this.nameEdit = input)}
              className="form-control"
              type="text"
              />
              </th>
              
              <th scope="col">
              <input
              ref={input => (this.descEdit = input)}
              className="form-control"
              type="text"
              />
              </th>
              
              <th scope="col">
              <input
              ref={input => (this.priceEdit = input)}
              className="form-control"
              type="text"
              />
              </th>
              
              <th scope="col">
              <input
              ref={input => (this.srcEdit = input)}
              className="form-control"
              type="text"
              />
              </th>

              <th scope="col">
              <button
              onClick={() => {
                this.onOkeProduct(this.state.id);
                    }}
                    className="btn btn-outline-warning"
                    >
                    Edit
                    </button>
                    </th>
                    </tr>
                    </tbody>
                    </table>
                  </div> */}
          <div>
            <h1 className="display-4 text-center">Input Product</h1>
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">NAME</th>

                  <th scope="col">DESC</th>

                  <th scope="col">PRICE</th>

                  <th scope="col">PICTURE</th>

                  <th scope="col">ACTION</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="col">
                    <input
                      ref={input => (this.name = input)}
                      className="form-control"
                      type="text"
                    />
                  </th>

                  <th scope="col">
                    <input
                      ref={input => (this.desc = input)}
                      className="form-control"
                      type="text"
                    />
                  </th>

                  <th scope="col">
                    <input
                      ref={input => (this.price = input)}
                      className="form-control"
                      type="text"
                    />
                  </th>

                  <th scope="col">
                    <input
                      ref={input => (this.src = input)}
                      className="form-control"
                      type="text"
                    />
                  </th>

                  <th scope="col">
                    <button
                      onClick={() => {
                        this.addProduct();
                      }}
                      className="btn btn-outline-warning"
                    >
                      Add
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

// const mapStateToProps = state => {
//   return { username: state.auth.username };
// };

export default connect(
  null,
  null
)(ManageProduct);
