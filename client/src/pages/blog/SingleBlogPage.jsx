import React from "react";
import { useParams, Link } from "react-router-dom";
import blogData from "../../data/blogs.json";

const SingleBlogPage = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Blog Not Found</h2>
        <Link to="/blog" className="text-indigo-500 font-bold hover:underline">
          Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Blog Hero section */}
      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
             <span className="inline-block bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                {blog.subtitle}
             </span>
             <h1 className="text-4xl md:text-7xl font-bold text-white font-sans leading-tight">
                {blog.title}
             </h1>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-3xl mx-auto px-4 mt-[-60px] relative z-10 bg-white rounded-md shadow-sm-t-[3rem] p-10 shadow-2xl">
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-100">
           <div className="flex items-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 font-bold mr-4">
                 SV
              </div>
              <div>
                 <p className="text-slate-900 font-bold">ShopVerse Editorial</p>
                 <p className="text-slate-500 text-sm">{blog.date}</p>
              </div>
           </div>
           <div className="flex gap-4">
              {/* Social sharing placeholders */}
              <button className="text-slate-400 hover:text-indigo-500 transition-colors">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </button>
           </div>
        </div>

        <div className="prose pindigo-lg max-w-none text-slate-700 leading-relaxed font-light">
           <p className="text-2xl font-sans text-slate-900 mb-8 italic">
              "Experience the convergence of style and substance in our latest editorial feature."
           </p>
           
           <p className="mb-6">
              {blog.content}
           </p>
           
           <p className="mb-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
           </p>

           <div className="bg-slate-50 p-8 rounded-2xl border-l-4 border-indigo-500 my-10">
              <p className="text-xl font-bold text-slate-800 mb-2">Key Takeaway:</p>
              <p className="text-slate-600 italic">Always prioritize quality and timeless design over fleeting trends to build a wardrobe that truly inspires confidence.</p>
           </div>

           <p className="mb-6">
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed 
              quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi 
              ut aliquid ex ea commodi consequatur?
           </p>
        </div>

        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
           <Link to="/blog" className="flex items-center text-indigo-500 font-bold group">
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to all blogs
           </Link>
           <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">Fashion</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">Lifestyle</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full">2026 Trends</span>
           </div>
        </div>
      </div>
    </article>
  );
};

export default SingleBlogPage;
