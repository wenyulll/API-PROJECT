import { csrfFetch } from "./csrf";

// // action type :
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS' //1. read reviews
const ADD_REVIEW = 'spots/LOAD_REVIEW' //2. add a review
const DELETE_REVIEW = 'spot/CREATE_REVIEW';//3. delete a review


//action creators
//1. read reviews
export const loadReviewsAction = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
})

//2. add a review
export const addReviewAction = (review, spotId) => ({
    type: ADD_REVIEW,
    review,
    spotId
});

//3. delete a review 
export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})


//thunks

//thunk 1. read reviews
export const fetchReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    // console.log("resonse", response)
    // console.log("spotId", spotId)

    if (response.ok) {
        const reviews = await response.json();

        dispatch(loadReviewsAction(reviews.Reviews));
    };
};

//thunk 2. add a review

export const addReviewThunk = (review, spotId) => async dispatch => {
    // console.log("spotId***************** createAReview", spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    // console.log('response in createAReview', response)
    if (response.ok) {
        const newReview = await response.json();
        dispatch(addReviewAction(newReview));
        return newReview;
    }
}
//thunk 2.delete d a review
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

//reducer
const initialState = {
    spot: {},
    user: {}
}

const reviewsReducer = (state = initialState, action) => {
    let newState
    let spot = {}
    switch (action.type) {
        case LOAD_REVIEWS: {
            newState = { ...state };
            action.reviews.Reviews.forEach(review => {
                spot[review.id] = review
            });
            newState.spot = spot
            return newState
        }
        case ADD_REVIEW: {
            newState = { spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.review.id] = action.review
            return newState
        }
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