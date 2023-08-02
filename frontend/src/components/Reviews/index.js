import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import * as reviewsActions from "../../store/reviews";
import AddReviewFormModal from "../AddReviewModal";
import './Reviews.css'


const Reviews = ({ reviews }) => {
    const spot = useSelector(state => {
        return state.spots.spot
    });
    // console.log("spot--------------", spot)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviewsArr = Object.values(reviews);
    useEffect(() => {
        dispatch(reviewsActions.getAllReviews(spotId))
    }, [dispatch, spotId])

    if (!reviews) return null

    return (
        <div className="review-div">
            <div className='spot-avgRating-all-reviews'>
                <i className="fa-sharp fa-solid fa-star"></i>
                <span>{!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>

                <span id='dots'> • </span>

                <span className='numReviews2'>{spot.numReviews} reviews
                </span>
            </div>
            <div className="review-wrap">
                {/* <div className="review-Lists"> */}
                {reviews && reviewsArr.map(review => (
                    <div className="review-details" key={review.id}>
                        <div className="review-creators">{review?.User?.firstName}</div>
                        <div className="review-date">{review?.createdAt.substring(0, 10)}</div>
                        <div className="review-contents">{review?.review}</div>

                    </div>
                ))}
                {/* </div> */}
            </div>

            {/* <div className="add-review-div"> */}
            {sessionUser && sessionUser.id !== spot?.ownerId && (
                <div className="add-review-button">
                    <AddReviewFormModal />
                </div>
            )}
            {/* </div> */}
        </div>
    )

}


export default Reviews;
