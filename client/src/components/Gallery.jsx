import React, { useState } from 'react';

function Gallery({ product }) {
    const [mainImg, setMainImg] = useState(0);

    const prevImage = () => {
        if (mainImg > 0) {
            setMainImg(mainImg - 1);
        }
    };

    const nextImage = () => {
        if (mainImg < product.gallery.length - 1) {
            setMainImg(mainImg + 1);
        }
    };

    return (
        <div data-testid='product-gallery' className='gallery flex mr-[109px] h-[478px]'>
            <div className='thunbails flex flex-col mr-[40px] overflow-y-scroll no-scrollbar'>
                {product.gallery.map((img, index) => (
                    <button
                        onClick={() => setMainImg(index)}
                        key={img}
                        className={`h-[80px] w-[80px] mb-[20px] flex justify-center items-center cursor-pointer border-transparent border-[1px] ${index === mainImg ? 'border-mainColor' : ''}`}
                    >
                        <img src={img} alt={product.name + index} />
                    </button>
                ))}
            </div>

            <div className='main-img w-[575px] flex justify-center items-center relative'>
                <img src={product.gallery[mainImg]} alt={product.name} />

                <button
                    onClick={prevImage}
                    className='absolute top-1/2 left-0 h-[31.7px] w-[31.7px] bg-black opacity-[73%] text-white p-2 hover:opacity-50'
                >
                    <span className='block h-3/4 w-3/4 border-t border-l border-white transform -rotate-45 ml-[33%]'></span>
                </button>

                <button
                    onClick={nextImage}
                    className='absolute top-1/2 right-0 h-[31.7px] w-[31.7px] bg-black opacity-[73%] text-white p-2 hover:opacity-50'
                >
                    <span className='block h-3/4 w-3/4 border-t border-r border-white transform rotate-45 mr-[33%]'></span>
                </button>
            </div>
        </div>
    );
}

export default Gallery;
