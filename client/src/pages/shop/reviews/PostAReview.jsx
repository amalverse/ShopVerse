import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { FiX, FiCheckCircle } from "react-icons/fi";

const PostAReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user: authUser } = useSelector((state) => state.auth);
  const user = authUser?.user ? authUser.user : authUser;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview, { isLoading }] = usePostReviewMutation();

  const handleRating = (value) => setRating(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      toast.error("Please login to post a review");
      return;
    }
    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    const newComment = {
      comment: comment.trim(),
      rating: rating,
      userId: user._id,
      productId: id,
    };

    try {
      await postReview(newComment).unwrap();
      toast.success("Thank you for your review!");
      setComment("");
      setRating(0);
      refetch();
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to post review.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-[100] px-4 animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-lg z-[110] relative animate-in zoom-in-95 duration-300 border border-slate-100">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-800 rounded-full transition-all"
        >
          <FiX className="text-xl" />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Share Your Experience</h2>
          <p className="text-slate-400 text-sm mt-1">Your feedback helps other shoppers make better choices.</p>
        </div>

        {/* Star Rating */}
        <div className="mb-8 p-6 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/50">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest text-center mb-4">Overall Rating</p>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                className={`text-4xl transition-all duration-300 ${
                  rating >= star ? "text-yellow-400 scale-110 drop-shadow-sm" : "text-slate-200 hover:text-indigo-200"
                }`}
              >
                {rating >= star ? <RiStarFill /> : <RiStarLine />}
              </button>
            ))}
          </div>
          <div className="h-6 flex items-center justify-center mt-3">
             {rating > 0 && (
                <span className="text-sm font-bold text-indigo-600 animate-in fade-in slide-in-from-bottom-1 duration-300 capitalize">
                   {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
                </span>
             )}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-8">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 ml-1">
             Detailed Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="What did you love? How's the quality? Everything you wish you knew before buying..."
            className="w-full border border-slate-200 rounded-2xl p-5 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 resize-none transition-all placeholder"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold rounded-2xl transition-all text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-3 w-3/5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
               <>
                  <FiCheckCircle className="text-base" />
                  Submit Review
               </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
