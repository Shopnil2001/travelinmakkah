"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * StarRating Component
 * @param {number} rating - Current rating value (0-5)
 * @param {number} totalRatings - Total number of ratings
 * @param {boolean} interactive - Whether user can click to rate
 * @param {function} onRate - Callback when user rates (receives rating 1-5)
 * @param {boolean} hasRated - Whether current user has already rated
 * @param {number} userRating - User's existing rating (if any)
 * @param {boolean} loading - Loading state
 * @param {string} size - Size variant: 'sm' | 'md' | 'lg'
 * @param {boolean} showText - Whether to show rating text
 */
const StarRating = ({
  rating = 0,
  totalRatings = 0,
  interactive = false,
  onRate,
  hasRated = false,
  userRating = null,
  loading = false,
  size = 'md',
  showText = true
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    sm: { star: 'w-3.5 h-3.5', text: 'text-xs', gap: 'gap-0.5' },
    md: { star: 'w-5 h-5', text: 'text-sm', gap: 'gap-1' },
    lg: { star: 'w-6 h-6', text: 'text-base', gap: 'gap-1' }
  };

  const currentSize = sizes[size] || sizes.md;
  const displayRating = hoverRating || rating;

  const handleClick = (starValue) => {
    if (!interactive || hasRated || loading) return;
    onRate?.(starValue);
  };

  const handleMouseEnter = (starValue) => {
    if (!interactive || hasRated || loading) return;
    setHoverRating(starValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Calculate if a star should be filled (supports decimal ratings)
  const getStarFill = (starIndex) => {
    if (starIndex <= Math.floor(displayRating)) {
      return 'full';
    }
    if (starIndex === Math.ceil(displayRating) && displayRating % 1 !== 0) {
      return 'partial';
    }
    return 'empty';
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center ${currentSize.gap}`}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const fillStatus = getStarFill(star);

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              disabled={!interactive || hasRated || loading}
              className={`
                relative transition-transform duration-150
                ${interactive && !hasRated && !loading
                  ? 'cursor-pointer hover:scale-110'
                  : 'cursor-default'}
                ${loading ? 'opacity-50' : ''}
              `}
              aria-label={`Rate ${star} stars`}
            >
              {/* Background star (empty) */}
              <Star
                className={`
                  ${currentSize.star}
                  text-gray-300
                  transition-colors duration-150
                `}
              />

              {/* Filled star overlay */}
              {(fillStatus === 'full' || hoverRating >= star) && (
                <Star
                  className={`
                    ${currentSize.star}
                    text-[#C9A962] fill-[#C9A962]
                    absolute inset-0
                    transition-colors duration-150
                  `}
                />
              )}

              {/* Partial fill for decimal ratings (when not hovering) */}
              {fillStatus === 'partial' && !hoverRating && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${(displayRating % 1) * 100}%` }}
                >
                  <Star
                    className={`${currentSize.star} text-[#C9A962] fill-[#C9A962]`}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Rating text */}
      {showText && (
        <span className={`${currentSize.text} text-[#64748B]`}>
          {rating > 0 ? (
            <>
              <span className="font-medium text-[#1E3A5F]">{rating.toFixed(1)}</span>
              {totalRatings > 0 && (
                <span className="ml-1">({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})</span>
              )}
            </>
          ) : (
            <span>No ratings yet</span>
          )}
        </span>
      )}

      {/* User has rated indicator */}
      {hasRated && userRating && (
        <span className="text-xs text-[#10B981] ml-2">
          You rated: {userRating} star{userRating !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
};

export default StarRating;
