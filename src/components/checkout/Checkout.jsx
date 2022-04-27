import React, { useState, useEffect } from "react";
import { CartItem } from "../cart";
import useAuth from "../../hooks/useAuth";
import { clearAllItemsInCart, addItemToOrders } from "../../axios-services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  let navigate = useNavigate();
  const { cart, isLoggedIn, user, setCart, setOrders, orders } = useAuth();
  const [total, setTotal] = useState(0);
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  function getTotal() {
    const prices = cart.map((item) => {
      return +item.price.slice(1) * item.quantity;
    });
    const newTotal = prices.reduce(
      (partialTotal, current) => partialTotal + current,
      0
    );

    // Because JS is bad at decimals.
    setTotal(Math.round((newTotal + Number.EPSILON) * 100) / 100);
  }

  async function concatOrders(response) {
    console.log(orders, "oldOI");
    console.log(response[0], "response");

    let newOrders = orders.concat(response);
    console.log(newOrders.length, "newO");
    setOrders(newOrders);
  }
  const responseArr = [];

  async function submitHandler() {
    if (isLoggedIn) {
      try {
        cart.map(async (product) => {
          let response = await addItemToOrders({
            productId: product.id,
            quantity: product.quantity,
          });
          console.log(responseArr, "test1");
          responseArr.push(response.cartItem);
          console.log(responseArr, "test2");
        });

        // let newArr = orders.concat(responseArr);

        // const newArr = orders.concat(test);
        // console.log(newArr, "testing");
        // setOrders(newArr);

        const response = await clearAllItemsInCart();
        // console.log(response);
        if (
          response.message === `Successfully cleared ${user.username}'s cart!`
        ) {
          setCart([]);
          toast("Order has been placed!");
          navigate("/");
        } else {
          console.error(response);
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setCart([]);
      toast("Successfully cleared guest's cart!");
    }
  }

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <span className="container">
      <br></br>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submitHandler();
          await concatOrders(responseArr);
        }}
      >
        <br></br>
        <label className="shipping">Shipping Info</label>

        <input type="text" placeholder="Address Line 1"></input>

        <input type="text" placeholder="Address Line 2"></input>

        <input type="text" placeholder="Address Line 3"></input>
        <br></br>
        <br></br>
        <label>Payment Method</label>
        <input type="text" placeholder="Credit Card Company"></input>
        <input type="text" placeholder="Name On Card"></input>
        <input type="text" placeholder="Credit Card Number"></input>
        <br></br>

        <br></br>
        <button className="order-button" type="submit">
          Place Your Order
        </button>
        <br></br>
        <br></br>
        <label>Review Items</label>
        <br></br>
      </form>
      <div className="cart-container">
        <table>
          <tbody>
            <tr className="cart-headers">
              <th>Product</th>
              <th>Quantity</th>
              <th>Update Quantity?</th>
              <th>Remove?</th>
            </tr>
            {cart.map((item, idx) => {
              return <CartItem key={`cart-item-${idx}`} item={item} />;
            })}
          </tbody>
        </table>
        <h4>Total Price: {`$${total}`}</h4>
      </div>
    </span>
  );
};

export default Checkout;
