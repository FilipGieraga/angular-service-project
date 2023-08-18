export interface ReviewI {
  id: number;
  productName: string;
  feedbackText: string;
  rating: number;
}

export interface PaginatedReviewI {
  reviews: ReviewI[];
  totalReviews: number;
}
