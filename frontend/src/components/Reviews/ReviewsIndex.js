import './reviews.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ReviewIndexItem from './ReviewsIndexItem';
import CreateReviewModal from './CreateReviewModal';
import OpenModalButton from '../OpenModalButton';
import { fetchReviewsThunk } from '../../store/reviews'


const ReviewIndex = ({ spot, spotId }) => {
    const dispatch = useDispatch();

    const reviews = Object.values(
        useSelector((state) => (state.reviews?.spot ? state.reviews.spot : []))
    ).sort((a, b) => new Date(a.createdAt).getDate() - new Date(b.createdAt).getTime());

    const sessionUser = useSelector((state) => state.session.user);

    const spotReview = {
        spotId,
        review: '',
        stars: 0,
    }

    let SubmitReviewButton;
    if (sessionUser) {
        if (sessionUser.id !== spot.ownerId && !(reviews.find(review => review.userId === sessionUser.id))) {
            SubmitReviewButton = (
                <OpenModalButton
                    buttonText='Submit Your Review'
                    modalComponent={<CreateReviewModal className='review-modal' spot={spot} spotId={spotId} user={sessionUser} spotReview={spotReview} />}
                />
            )
        }
    }

    useEffect(() => {
        dispatch(fetchReviewsThunk(spotId))
    }, [dispatch, spotId]);


    return (
        <div className='reviews-Index'>
            <div className='reviews-header'>
                <h3><i className='fa-solid fa-star' /> {Number(spot.numReviews) > 0 ? Number(spot.numReviews) === 1 ? `${Number(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review` : `${Number(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : ' New'}</h3>
            </div>
            {sessionUser && SubmitReviewButton}
            {sessionUser && SubmitReviewButton && reviews.length === 0 && (
                <h3>Be the first to post a review!</h3>
            )}
            <div className='reviewsContainer'>
                <ul className='reviews-list'>
                    {reviews.map((review) => (
                        <li className='review-index-item' key={review.id}>
                            <ReviewIndexItem review={review} spotId={spotId} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default ReviewIndex;
