import React from "react";
import { Link } from "react-router-dom";
import category1 from "../../assets/category-4.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-1.jpg";
import category4 from "../../assets/category-3.jpg";

const Categories = () => {
  const categoryList = [
    {
      name: "Electronics",
      path: "/electronics",
      image: category1,
      color: "from-blue-500/20"
    },
    {
      name: "Women's Clothing",
      path: "/womens-clothing",
      image: category2,
      color: "from-pink-500/20"
    },
    {
      name: "Men's Clothing",
      path: "/mens-clothing",
      image: category3,
      color: "from-indigo-500/20"
    },
    {
      name: "Jewellery",
      path: "/jewellery",
      image: category4,
      color: "from-amber-500/20"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="text-center mb-12">
         <h3 className="text-3xl font-black text-slate-900 font-sans tracking-tight mb-2 uppercase tracking-[0.1em]">Explore Collections</h3>
         <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        {categoryList.map((category) => (
          <Link
            key={category.name}
            to={`/categories${category.path}`}
            className="group flex flex-col items-center"
          >
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-sm group-hover:-translate-y-2 transition-all p-2 group-hover:shadow-lg group-hover:border-indigo-100/50">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-[2rem] transform transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Floating label inside if we wanted, but let's keep it clean */}
            </div>
            
            <h4 className="mt-6 text-base sm:text-lg font-black font-sans text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-wider">
              {category.name}
            </h4>
            <div className="mt-1 w-0 group-hover:w-12 h-0.5 bg-indigo-600 transition-all duration-500 rounded-full" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
