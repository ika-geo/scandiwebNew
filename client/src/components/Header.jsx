import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Categories from './Categories.jsx';
import Cart from './Cart.jsx';
import {fetchCategories} from "../store/features/categorySlice.js";

function Header() {
    const dispatch = useDispatch();
    const cartOpen = useSelector(state => state.cart.cartOpen);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className='text-base font-raleway text-customBlack'>
            <header className="relative z-20 bg-white">
                <div className="relative container pt-7 flex justify-between items-center">
                    <div className='w-1/3'>
                        <Categories />
                    </div>

                    <div className='w-1/3 flex justify-center'>
                        <img className='block' src={require('../src/media/logo.png')} alt="Logo" />
                    </div>

                    <div className='w-1/3 flex justify-end'>
                        <Cart />
                    </div>
                </div>
            </header>

            <div className="pt-[80px]">
                <div className="container">
                    <Outlet />
                </div>
            </div>

            {cartOpen && (
                <div className="fixed h-full w-full top-0 left-0 bg-[#393748] opacity-[22%] z-10"></div>
            )}
        </div>
    );
}

export default Header;
