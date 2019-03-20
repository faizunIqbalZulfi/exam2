import React from "react";
import axios from "axios";

import ProductItem from "./ProductItem";

class Home extends React.Component {
  state = {
    products: [],
    newProducts: []
    // onType: ""
  };

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    axios
      .get("http://localhost:1996/products")

      .then(res => {
        this.setState({ products: res.data, newProducts: res.data });
      });
  };

  // onChangeInput = e => {
  //   // console.log(e.target.value);
  // };

  searchProduct = e => {
    // e.preventDefault();
    // this.setState({
    //   onType: e.target.value
    // });
    // const nama = this.target.value;
    // this.setState({
    //   onType: e.target.value
    // products: this.state.products.filter(person => {
    //   return person.name.includes(nama);
    // });
    const name = this.name.value;
    const min = parseInt(this.min.value);
    const max = parseInt(this.max.value);
    console.log(name);

    // if (e.target.value !== "") {
    this.setState({
      // onType: e.target.value,
      newProducts: this.state.products.filter(item => {
        if (isNaN(min) && isNaN(max)) {
          return item.name.toLowerCase().includes(name.toLowerCase());
        } else if (isNaN(min)) {
          return (
            item.name.toLowerCase().includes(name.toLowerCase()) &&
            item.price < max
          );
        } else if (isNaN(max)) {
          return (
            item.name.toLowerCase().includes(name.toLowerCase()) &&
            item.price > min
          );
        } else {
          return (
            item.name.toLowerCase().includes(name.toLowerCase()) &&
            item.price < max &&
            item.price > min
          );
        }
      })
    });
    console.log(this.state.newProducts);
    // } else {
    //   this.getProduct();
    // }
  };

  onAddToCart = id => {
    console.log(id);
  };

  renderList = () => {
    // if (this.state.onType !== "") {
    return this.state.newProducts.map(iteem => {
      return <ProductItem item={iteem} />;
    });
    // } else {
    //   return this.state.products.map(iteem => {
    //     return <ProductItem item={iteem} />;
    //   });
    // }
  };

  render() {
    console.log(this.state.products);

    return (
      <div className="d-flex justify-content-center">
        <div className="col-2  mt-4">
          <div className="mx-auto card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title">
                <h1>Search</h1>
              </div>

              <div className="card-title mt-1">
                <h4>Name</h4>
              </div>

              <form className="input-group">
                <input
                  ref={input => (this.name = input)}
                  className="form-control"
                  type="text"
                />
              </form>

              <div className="card-title mt-1">
                <h4>Price</h4>
              </div>

              <form className="input-group">
                <input
                  placeholder="Minimum"
                  ref={input => (this.min = input)}
                  className="form-control mb-2"
                  type="text"
                />
              </form>

              <form className="input-group">
                <input
                  placeholder="Maximum"
                  ref={input => (this.max = input)}
                  className="form-control"
                  type="text"
                />
              </form>

              <button
                onClick={this.searchProduct}
                className="btn btn-outline-light btn-block mt-5"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="row  col-10">{this.renderList()}</div>
      </div>
    );
  }
}
export default Home;
