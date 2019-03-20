import React from "react";
import axios from "axios";

class DetailProduct extends React.Component {
  state = {
    product: {}
  };

  componentDidMount() {
    const idproduct = parseInt(this.props.match.params.product_id);

    axios
      .get("http://localhost:1996/products/" + idproduct)

      .then(res => {
        this.setState({ product: res.data });
        console.log(res.data);
      });
  }

  render() {
    const { product } = this.state;

    console.log(product.price);

    return (
      <div className="card text-center" key={product.id}>
        <div className="card-header">{product.name}</div>

        <div className="card-body">
          <img src={product.src} alt={product.name} />

          <h3 className="card-title">Product: {product.name}</h3>

          <p className="card-text">Description: {product.desc}</p>

          <p className="card-text">
            {product.price !== undefined
              ? `Price: Rp.${product.price.toLocaleString("IN")}`
              : null}
          </p>

          {/* <a href="/" className="btn btn-block btn-primary">
            Add to Cart
          </a> */}
        </div>
      </div>
    );
  }
}
export default DetailProduct;
