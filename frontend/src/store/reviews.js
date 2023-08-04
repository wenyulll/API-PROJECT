import { csrfFetch } from "./csrf";

/***** REVIEW ACTIONS *****/

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const CREATE_REVIEW = 'review/CREATE_REVIEW';
export const DELETE_REVIEW = 'review/DELETE_REVIEW';

/***** REVIEW ACTION CREATORS *****/

export const loadReviewsAction = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
});

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

/***** REVIEW THUNKS *****/

export const fetchReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviewsAction(reviews.Reviews));
    };
};

export const createReviewThunk = (spotReview) => async (dispatch) => {

    try {
        const {
            user,
            spotId,
            review,
            stars
        } = spotReview;

        const { firstName, lastName, id } = user;

        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                review,
                stars
            })
        });

        if (response.ok) {
            const review = await response.json();
            review.User = { firstName, lastName, id }
            dispatch(createReviewAction(review))
            return review
        }

    } catch (e) {
        const errors = await e.json();
        return errors
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(deleteReviewAction(reviewId));
        return review;
    }

}

/***** REVIEWS REDUCER  *****/

const initialState = { spot: {}, user: {} };

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { spot: {} }
            action.reviews.forEach((review) => {
                newState.spot[review.id] = review;
            });
            return newState;
        };
        case CREATE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            newState.spot[action.review.id] = action.review
            return newState;
        };
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId];
            return newState;
        };
        default:
            return state;
    };
};

export default reviewsReducer;