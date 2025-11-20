import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-lg text-gray-600 mb-4">${product.price}</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition duration-300">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
