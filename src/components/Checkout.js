import React from "react";
import axios from "axios";

class Checkout extends React.Component {
  onMapCart = () => {
    return this.props.cart.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.productId}</td>
          <td>{item.name}</td>
          {/* <td>{item.desc}</td> */}
          <td>{`Rp.${item.price.toLocaleString("IN")}`}</td>
          {/* <td>
              <img className="list" src={item.src} alt={item.src} />
            </td> */}
          <td>{item.qty}</td>
          <td>{`Rp.${(item.price * item.qty).toLocaleString("IN")}`}</td>
        </tr>
      );
    });
  };

  onTotalPrice = () => {
    console.log(this.props.cart);
    let total = 0;
    for (let i = 0; i < this.props.cart.length; i++) {
      console.log(this.props.cart[i].qty);
      console.log(this.props.cart[i].price);
      //   this.setState({
      //     total:
      //       this.state.total +
      //       parseInt(this.props.cart.price) * parseInt(this.props.cart.qty)
      //   });
      total =
        total +
        parseInt(this.props.cart[i].price) * parseInt(this.props.cart[i].qty);
      console.log(total);
    }
    return total.toLocaleString("IN");
  };

  render() {
    return (
      <div className="text-center">
        <h1 className="display-4 text-center">Checkout</h1>

        <table className="table table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>

              <th scope="col">NAME</th>

              <th scope="col">PRICE</th>

              <th scope="col">QUANTITY</th>

              <th scope="col">TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {this.onMapCart()}
            <tr className="bg-success">
              <td />
              <td />
              <td>
                <h6>Total Belanja</h6>
              </td>
              <td />
              {/* <td /> */}
              <td>{`Rp.${this.onTotalPrice()}`}</td>
            </tr>
          </tbody>
        </table>
        {/* <div></div> */}
      </div>
    );
  }
}

export default Checkout;
