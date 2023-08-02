import { csrfFetch } from "./csrf";

// action type :

const ALL_REVIEWS = "reviews/ALL_REVIEWS";
const USER_REVIEWS = "reviews/USER_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
// const EDIT_REVIEW = 'reviews/EDIT_REVIEW';

// action creators

const loadAllReviews = (reviews, spotId) => ({
    type: ALL_REVIEWS,
    reviews,
    spotId

})

const loadUserReviews = (reviews) => ({
    type: USER_REVIEWS,
    reviews
})

const addAReview = (review, spotId) => ({
    type: CREATE_REVIEW,
    review,
    spotId
})

const deleteAReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId

})

// const editReview = (review) => {
//     return {
//         type: EDIT_REVIEW,
//         review
//     }
// }

// Thunk action get all reviews by spotId

export const getAllReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    // console.log("response***********//", response)
    // console.log("spotId???????????????????/", spotId)
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAllReviews(reviews));
        return reviews;
    };
}


// Thunk action  get current user reviews

export const getUserReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`);

    if (response.ok) {
        const userReviews = await response.json();
        dispatch(loadUserReviews(userReviews));
        return userReviews;
    };
}

// Thunk action create a review by spotId

export const createAReview = (review, spotId) => async dispatch => {
    // console.log("spotId***************** createAReview", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    // console.log('res$$$$$$$$$$$ in createAReview', response)
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addAReview(newReview));
        return newReview;
    };
}


// Thunk action delete a review

export const removeAReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    // console.log('res$$$$$$$$$$$ in deleteAReview', response)
    if (response.ok) {
        const successMessage = await response.json();
        dispatch(deleteAReview(reviewId));
        return successMessage;
    }
}


// export const editReviewThunk = (review, reviewId) => async dispatch => {
//     try {
//         const response = await csrfFetch(`/api/reviews/${reviewId}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': "application/json" },
//             body: JSON.stringify(review)
//         })
//         if (response.ok) {
//             const data = await response.json();
//             dispatch(editReview(data));
//             return data
//         }
//     } catch (err) {
//         console.log(err);
//         throw err;
//     }
// }

// reviews Reducer

const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    // console.log("running###################")
    let newState;
    let spot = {};
    switch (action.type) {
        case ALL_REVIEWS:

            newState = { ...state };
            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            });
            newState.spot = spot
            return newState

        case USER_REVIEWS:
            newState = { spot: {}, user: {} };
            action.reviews.Reviews.forEach(review => {
                newState.user[review.id] = review
                newState.spot[review.id] = review.Spot

            });
            newState.spot = {}
            return newState;

        case CREATE_REVIEW:
            newState = { spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.review.id] = action.review
            return newState

        // case EDIT_REVIEW:
        //     newState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
        //     const editReview = { ...action.review };
        //     newState.spot[action.review.id] = editReview;
        //     newState.user[action.review.id] = editReview;
        //     return newState;

        case DELETE_REVIEW:
            newState = { spot: { ...state.spot }, user: { ...state.user } }
            delete newState.spot[action.reviewId]
            delete newState.user[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewsReducer;
