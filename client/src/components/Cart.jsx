import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem.jsx';
import {createOrder, openCloseCart} from "../store/features/cartSlice.js";


function Cart() {
    const dispatch = useDispatch();

    const totalItems = useSelector((state) => state.cart.totalItems);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const cartOpen = useSelector((state) => state.cart.cartOpen);
    const cartItems = useSelector((state) => state.cart.items);

    const handlePlaceOrder = () => {
        const order = cartItems.map((cartItem) => {
            const attributes = Object.keys(cartItem.attributes).map((attributeName) => ({
                name: attributeName,
                value: cartItem.attributes[attributeName],
            }));

            return {
                product_id: cartItem.product_id,
                quantity: cartItem.quantity,
                price: cartItem.price,
                attributes,
            };
        });

        dispatch(createOrder(order));
    };

    const handleOpenCloseCart = () => {
        dispatch(openCloseCart());
    };

    return (
        <div>
            <button
                data-testid='cart-btn'
                onClick={handleOpenCloseCart}
                className="cursor-pointer relative"
            >
                <img src={require('../src/media/cart.png')} alt="cart" />
                {totalItems > 0 && (
                    <div className="absolute top-[-15px] right-[-15px] px-1 min-h-[23px] min-w-[23px] rounded-full bg-black text-white text-center flex justify-center items-center">
                        <span data-testid="cart-total">{totalItems}</span>
                    </div>
                )}
            </button>
            {cartOpen && (
                <div className="absolute bg-white top-[100%] right-0 min-h-[100px] w-[350px] px-4 py-8">
                    <h1 className="font-raleway font-[700] text-[16px] mb-8">
                        My Bag, <span className="font-[500]">{totalItems} items</span>
                    </h1>
                    <div>
                        {cartItems && cartItems.map((item) => (
                            <CartItem key={item.id} data={item} />
                        ))}
                        <div className="flex justify-between font-roboto-condensed mb-8">
                            <p className="font-[500]">Total</p>
                            <p className="font-[700]">${totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <button
                        disabled={!totalItems}
                        className={'primaryButton py-[13px] ' + (!totalItems ? 'opacity-50' : '')}
                        onClick={handlePlaceOrder}
                    >
                        PLACE ORDER
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;
