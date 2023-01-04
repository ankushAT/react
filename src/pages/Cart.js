import React from "react";
import "../App.css";
import axios from 'axios'
import { Navigate } from "react-router-dom";


function Cart({ isLoggedin }) {

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const fetchingCartItems = async () => {
        console.log('inside fetching cart Items')
        try {

            const url = 'http://localhost:8000/cart/';
            const headers = { authorization: "Token 8bfc73e5a1cfe821a220ce888f923a87e382a22f" }
            const response = await axios.get(url, { headers })
            console.log("response from backend", response, response.data);
            return response.data
        } catch (error) {
            console.log('error is in fetching products', error);
        }
        console.log('inside fetch products ends')
    }

    const fetchCartItemHandler = async () => {
        const cart = await fetchingCartItems();
        console.log(isLoggedin)
        setData(cart)
        setLoading(false)
        return null
    }

    React.useEffect(() => {
        fetchCartItemHandler()

        return () => {
            console.log("This will be logged on unmount");
        }
    }, [])


    if (loading) {
        return (
            <h3>
                2 Min...
            </h3>
        )
    }

    return (
        <div className="cart_section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="cart_container">
                            <div className="cart_title">Shopping Cart<small> (1 item in your cart) </small></div>
                            {
                                data.items.map(((item, index) => (
                                    <div className="cart_items" key={index}>
                                        <ul className="cart_list">
                                            <li className="cart_item clearfix">
                                                <div className="cart_item_image"><img src={item.product.image} height="200" width="150" alt=""></img></div>
                                                <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                                    <div className="cart_item_name cart_info_col">
                                                        <div className="cart_item_title">Name</div>
                                                        <div className="cart_item_text">{item.product.name}</div>
                                                    </div>

                                                    <div className="cart_item_quantity cart_info_col">
                                                        <div className="cart_item_title">Quantity</div>
                                                        <div className="cart_item_text">{item.quantity}</div>
                                                    </div>
                                                    <div className="cart_item_price cart_info_col">
                                                        <div className="cart_item_title">Price</div>
                                                        <div className="cart_item_text">₹{item.product.price}</div>
                                                    </div>
                                                    <div className="cart_item_total cart_info_col">
                                                        <div className="cart_item_title">Total</div>
                                                        <div className="cart_item_text">₹{item.total}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )))
                            }
                            <div className="order_total">
                                <div className="order_total_content text-md-right">
                                    <div className="order_total_title">Order Total:</div>
                                    <div className="order_total_amount"><h5>₹{data.subtotal}</h5></div>
                                </div>
                                <div className="cart_buttons"> <button type="button" className="button cart_button_clear">Continue Shopping</button> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Cart;