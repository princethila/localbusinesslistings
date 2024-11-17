import React from 'react';

interface StarRatingProps {
    rating: number;
};


const FullStar = ({ fill }: { fill: boolean }) => (
    <svg
      className={`w-4 h-4 ${fill ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927C9.32 2.237 10.68 2.237 10.951 2.927L12.545 6.775C12.713 7.18 13.106 7.451 13.546 7.451H17.63C18.443 7.451 18.79 8.482 18.17 8.965L14.677 11.719C14.31 12.011 14.153 12.518 14.318 12.976L15.644 16.672C15.937 17.496 15.055 18.198 14.334 17.717L10.97 15.451C10.606 15.213 10.094 15.213 9.731 15.451L6.366 17.717C5.645 18.198 4.763 17.496 5.055 16.672L6.382 12.976C6.546 12.518 6.389 12.011 6.022 11.719L2.53 8.965C1.909 8.482 2.257 7.451 3.069 7.451H7.154C7.594 7.451 7.987 7.18 8.155 6.775L9.049 2.927Z" />
    </svg>
  );
  
  const HalfStar = ({ fill }: { fill: boolean }) => (
    <svg
      className={`w-4 h-4 ${fill ? 'text-yellow-500' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={fill ? 'url(#half)' : 'currentColor'}
      />
    </svg>
  );


  export default function StarRating({rating}: StarRatingProps){

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return(
        <div className="flex">
      {[...Array(fullStars)].map((_, index) => (
        <FullStar key={`full-${index}`} fill={true} />
      ))}
      {hasHalfStar && <HalfStar fill={true} />}
      {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FullStar key={`empty-${index}`} fill={false} />
      ))}
    </div>
    )
}