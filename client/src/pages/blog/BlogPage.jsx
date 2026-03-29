import React from "react";
import { Link } from "react-router-dom";
import blogData from "../../data/blogs.json";

const BlogPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Blog Hero Section */}
      <section className="bg-indigo-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-sans text-slate-900 mb-4">
            Our Official Blog
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover the latest trends, styling tips, and behind-the-scenes stories from the world of fashion & lifestyle.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.map((blog) => (
            <Link
              to={`/blog/${blog.id}`}
              key={blog.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white px-4 py-1 rounded-full text-xs font-bold text-indigo-500 shadow-sm uppercase tracking-wider">
                    {blog.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-slate-400 text-sm font-medium mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {blog.date}
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                  {blog.content}
                </p>
                <div className="text-indigo-500 font-bold flex items-center group/btn hover:text-indigo-700 transition-colors">
                  Read Full Article
                  <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l8 8-8 8" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-slate-900 py-16 px-4 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Trend</h2>
          <p className="text-slate-400 mb-8">Subscribe to our newsletter for weekly style inspiration and exclusive offers.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-3 rounded-full bg-slate-800 border-none text-white focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
