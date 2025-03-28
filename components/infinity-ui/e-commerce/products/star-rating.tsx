import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, max = 5, size = "md" }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = max - fullStars - (partialStar > 0 ? 1 : 0);

  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const sizeClass = starSizes[size];

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${sizeClass} fill-yellow-400 text-yellow-400`}
        />
      ))}

      {partialStar > 0 && (
        <div className="relative">
          <Star className={`${sizeClass} text-gray-300 dark:text-gray-600`} />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialStar * 100}%` }}
          >
            <Star className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${sizeClass} text-gray-300 dark:text-gray-600`}
        />
      ))}
    </div>
  );
};

export default StarRating;
