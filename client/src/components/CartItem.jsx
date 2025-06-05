import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {fetchGraphQL} from "../graphql/fetchGraphQL.js";
import {GET_PRODUCT_BY_ID} from "../graphql/queries.js";

import ProductAttributes from './ProductAttributes.jsx';
import {checkForUpdatedDatas, decreaseItemCount, increaseItemCount} from "../store/features/cartSlice.js";


function CartItem({ data }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true);
            const response = await fetchGraphQL(GET_PRODUCT_BY_ID, { product_id: data.product_id });
            const productData = response?.product || null;
            setProduct(productData);

            if (productData) {
                dispatch(checkForUpdatedDatas({ product_id: data.id, name: productData.name, price: productData.prices.amount }));
            }

            setLoading(false);
        }
        fetchProduct();
    }, [data.product_id, data.id, dispatch]);

    const handleIncrease = () => {
        dispatch(increaseItemCount(data.id));
    };

    const handleDecrease = () => {
        dispatch(decreaseItemCount(data.id));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div data-testid="cart-total" className="flex justify-between mb-10">
            <div className="flex justify-between w-[60%]">
                {/* details */}
                <div>
                    <p className="font-raleway font-[300] mb-1 text-[18px]">{product.name}</p>
                    <p className="font-raleway font-[400] mb-2 text-[16px]">
                        {product.prices.currency.symbol}
                        {product.prices.amount}
                    </p>

                    <ProductAttributes
                        attributes={product.attributes}
                        selectedAttributes={data.attributes}
                        handleAttributeChange={() => {}}
                        cart={true}
                    />
                </div>

                {/* counter */}
                <div className="flex justify-between items-center flex-col font-raleway text-xl font-[400] ml-1">
                    <button
                        data-testid="cart-item-amount-increase"
                        className="border border-customBlack h-8 w-8 flex justify-center items-center"
                        onClick={handleIncrease}
                    >
                        +
                    </button>

                    <p data-testid="cart-item-amount">{data.quantity}</p>

                    <button
                        data-testid="cart-item-amount-decrease"
                        className="border border-customBlack h-8 w-8 flex justify-center items-center"
                        onClick={handleDecrease}
                    >
                        -
                    </button>
                </div>
            </div>

            {/* img */}
            <div className="w-[35%]">
                <img src={product.gallery[0]} alt={product.name} />
            </div>
        </div>
    );
}

export default CartItem;
