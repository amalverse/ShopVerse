import React from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      i <= Math.round(rating || 0) ? (
        <IoStar key={i} className="" />
      ) : (
        <IoStarOutline key={i} className="" />
      ),
    );
  }

  return <div className="flex gap-0.5 text-amber-400">{stars}</div>;
};

export default RatingStars;
