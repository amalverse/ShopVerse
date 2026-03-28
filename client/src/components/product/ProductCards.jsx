import React from "react";
import ProductCard from "./ProductCard";

const ProductCards = ({ products, isFavoritePage, onRemoveFavorite, onQuickView }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <ProductCard
            key={index} 
            product={product} 
            isFavoritePage={isFavoritePage} 
            onRemoveFavorite={onRemoveFavorite} 
            onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductCards;
