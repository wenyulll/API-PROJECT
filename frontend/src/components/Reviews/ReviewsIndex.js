import './reviews.css'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ReviewIndexItem from './ReviewsIndexItem';
import CreateReviewModal from './CreateReviewModal';
import OpenModalButton from '../OpenModalButton';
import { fetchReviewsThunk } from '../../store/reviews'


const ReviewIndex = ({ spot, spotId }) => {
    // 从Redux的state中获取当前房屋的所有评论，并按创建时间排序
    const dispatch = useDispatch();
    // 从Redux的state中获取当前房屋的所有评论，并按创建时间排序
    const reviews = Object.values(
        useSelector((state) => (state.reviews?.spot ? state.reviews.spot : []))
    ).sort((a, b) => new Date(a.createdAt).getDate() - new Date(b.createdAt).getTime());

    // 获取当前登录的用户信息
    const sessionUser = useSelector((state) => state.session.user);

    // 创建一个初始的房屋评论对象
    const spotReview = {
        spotId,
        review: '',
        stars: 0,
    }

    let SubmitReviewButton;
    // 如果用户已登录
    if (sessionUser) {
        // 如果当前用户不是房屋的拥有者，并且该用户尚未对该房屋发表评论
        if (sessionUser.id !== spot.ownerId && !(reviews.find(review => review.userId === sessionUser.id))) {
            // 创建一个OpenModalButton元素，用于打开评论提交的弹出框
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
                <h3><i className='fa-solid fa-star' /> {spot.numReviews > 0 ? spot.numReviews === 1 ? `${spot.avgStarRating.toFixed(2)} · ${spot.numReviews} review` : `${spot.avgStarRating.toFixed(2)} · ${spot.numReviews} reviews` : ' New'}</h3>
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
