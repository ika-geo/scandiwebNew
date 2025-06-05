import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {selectCategory} from "../store/features/categorySlice.js";


function Categories() {
    const dispatch = useDispatch();
    const { items: categories, loading, error, selectedCategory } = useSelector(state => state.categories);

    const handleCategorySelect = (category) => {
        dispatch(selectCategory({ name: category.name, id: category.id }));
    };

    if (loading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>Can't fetch categories</p>;
    }

    return (
        <nav className="flex space-x-4">
            {categories.map(category => (
                <Link
                    to={category.id === 1 ? '/' : `/categories/${category.name}`}
                    key={category.id}
                    className={
                        "text-4 font-[600] pt-1 px-4 pb-8 uppercase hover:opacity-50 " +
                        (category.id === selectedCategory.id ? 'activeCategory' : '')
                    }
                    data-testid={category.id === selectedCategory.id ? 'active-category-link' : 'category-link'}
                    onClick={() => handleCategorySelect(category)}
                >
                    {category.name}
                </Link>
            ))}
        </nav>
    );
}

export default Categories;
