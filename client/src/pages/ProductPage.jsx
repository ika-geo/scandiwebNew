import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import parse from 'html-react-parser';
import ProductAttributes from "../components/ProductAttributes.jsx";

import { useParams } from 'react-router-dom';
import Gallery from "../components/Gallery.jsx";
import {fetchProductById} from "../store/features/productSlice.js";
import {addToCart, openCloseCart} from "../store/features/cartSlice.js";

function ProductPage() {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.products.selectedProduct);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const [selectedAttributes, setSelectedAttributes] = useState({});

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
            setSelectedAttributes({}); // reset attributes when product changes
        }
    }, [productId, dispatch]);

    const handleAttributeChange = (name, value) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddToCart = () => {
        if (!product) return;

        dispatch(
            addToCart({
                id: Date.now().toString(),
                product_id: product.id,
                price: product.prices.amount,
                name: product.name,
                attributes: selectedAttributes,
                quantity: 1,
            })
        );
        dispatch(openCloseCart());
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Some problem in fetching product</p>;
    if (!product) return <p>Product not found</p>;

    const isAddDisabled =
        !product.inStock || Object.keys(selectedAttributes).length !== product.attributes.length;

    return (
        <div className="flex">
            <Gallery product={product} />

            <div className="w-[292px]">
                <h1 className="font-semibold text-2xl mb-8">{product.name}</h1>

                <ProductAttributes
                    attributes={product.attributes}
                    selectedAttributes={selectedAttributes}
                    handleAttributeChange={handleAttributeChange}
                    cart={false}
                />

                <div className="mt-[27px] mb-5">
                    <h2 className="productDetailTitle">PRICE</h2>
                    <p className="font-raleway font-bold text-2xl">
                        {product.prices.currency.symbol}
                        {product.prices.amount.toFixed(2)}
                    </p>
                </div>

                <button
                    data-testid="add-to-cart"
                    disabled={isAddDisabled}
                    className={
                        'primaryButton py-4 mb-8 ' +
                        (isAddDisabled ? 'opacity-35 ' : '') +
                        (!product.inStock ? 'opacity-50 cursor-not-allowed' : '')
                    }
                    onClick={handleAddToCart}
                >
                    add to cart
                </button>

                <div data-testid="product-description">{parse(product.description)}</div>
            </div>
        </div>
    );
}

export default ProductPage;
