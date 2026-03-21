import React, { useState } from "react";
import commentorIcon from "../../../assets/avatar.png";
import formatDate from "../../../utils/formateDate";
import RatingStars from "../../../components/RatingStars";
import PostAReview from "./PostAReview";
import { FiMessageSquare, FiPlus } from "react-icons/fi";

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviews = productReviews || [];

  const handleOpenReviewModal = () => setIsModalOpen(true);
  const handleCloseReviewModal = () => setIsModalOpen(false);

  return (
    <div className="my-8 bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
      <div>
        {reviews.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold font-sans text-slate-800 flex items-center gap-2">
                 <FiMessageSquare className="text-indigo-600" />
                 Product Reviews ({reviews.length})
               </h3>
               <button
                  onClick={handleOpenReviewModal}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-all text-sm"
                >
                  <FiPlus />
                  Write a Review
                </button>
            </div>
            
            <div className="space-y-8">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex gap-4 md:gap-6 md:flex-row flex-col border-b border-slate-100 pb-8 last:border-b-0 last:pb-0"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={commentorIcon}
                      alt="avatar"
                      className="h-14 w-14 rounded-full object-cover border-2 border-indigo-50 p-0.5 bg-white shadow-sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Header: User & Date */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-slate-900 text-base font-sans capitalize">
                          {review?.userId?.username || "Verified Customer"}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                          {formatDate(review?.updatedAt)}
                        </p>
                      </div>
                      <div className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <RatingStars rating={review?.rating} />
                      </div>
                    </div>

                    {/* Comment Box */}
                    <div className="mt-2 p-5 bg-slate-50 rounded-2xl border border-slate-100/50 shadow-sm/5 hover:bg-white hover:shadow-md hover:border-indigo-100 transition-all duration-300">
                      <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                        "{review?.comment}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-slate-800 font-sans mb-1">No reviews yet</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">
              Be the first to share your thoughts about this product!
            </p>
            <button
               onClick={handleOpenReviewModal}
               className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 text-sm"
            >
               <FiPlus />
               Post Your Review
            </button>
          </div>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="mt-10 flex justify-center md:hidden">
          <button
            onClick={handleOpenReviewModal}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 text-sm"
          >
            <FiPlus />
            Write a Review
          </button>
        </div>
      )}

      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
};

export default ReviewsCard;
