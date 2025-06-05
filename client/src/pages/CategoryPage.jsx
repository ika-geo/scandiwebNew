import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Product from "../components/Product.jsx";
import {fetchProductsByCategory} from "../store/features/productSlice.js";

function CategoryPage() {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);

    useEffect(() => {
        if (selectedCategory.id) {
            dispatch(fetchProductsByCategory(selectedCategory.id));
        }
    }, [selectedCategory.id, dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Can't fetch categories</p>;

    return (
        <div>
            <h1 className='uppercase font-raleway font-normal text-4xl mb-[130px]'>{selectedCategory.name}</h1>
            <div className='grid gap-3 grid-cols-3'>
                {products.map((item) => (
                    <Product key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
