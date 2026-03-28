import React from "react";
import { Link } from "react-router-dom";
import blogData from "../../data/blogs.json";

const Blogs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-100 rounded-2xl my-12">
      <h2 className="mb-4 text-4xl font-extrabold text-black text-center">
        Latest From Blogs
      </h2>
      <p className="max-w-lg mx-auto text-center text-gray-700 mb-10">
        Elevate Your Wardrobe with our freshest style tips, trends, and
        inspiration on our blog.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {blogData.slice(0, 4).map((blog, index) => (
          <Link
            to={`/blog/${blog.id}`}
            key={index}
            className="flex flex-col bg-white shadow-2xl rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-3xl transition-transform duration-300"
          >
            <div className="w-full h-56 overflow-hidden">
              <img src={blog.imageUrl} alt="Blog Image" className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h6 className="text-sm text-indigo-500 font-bold tracking-wide uppercase mb-2">
                {blog.subtitle}
              </h6>
              <h4 className="mb-3 text-xl font-bold text-gray-900 leading-tight">
                {blog.title}
              </h4>
              <p className="text-sm font-medium text-gray-500 mt-auto">{blog.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
