import { csrfFetch } from "./csrf";


// action type 
const LOAD_SPOTS = 'spots/LOAD_SPOTS' //1. get all spots
const ONE_SPOT = 'spots/ONE_SPOT' //2. get one spot by spotId 
const CURRENT_SPOTS = 'spots/CURRENT_SPOTS' //3. get current user spots
const ADD_SPOT = 'spots/ADD_SPOT' //4. add a new spot
const UPDATE_SPOT = 'spots/UPDATE_SPOT' //5. update spot
const DELETE_SPOT = 'spots/DELETE_SPOT' //6. delete spot
const ADD_IMG = 'spots/ADD_IMG' //7. add image to spot

//action creators
//1.get all spots
const loadAllSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
})
//2.get one spot by spotId
const loadOneSpot = (spot) => ({
    type: ONE_SPOT,
    spot
})
//3.get current user spots
const current = (spots) => ({
    type: CURRENT_SPOTS,
    spots
})
//4. add a new spot
const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
})
//5. update spot 
const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot

})
//6. delete spot
const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})
//7. add image to spot
const addImg = (spot, img) => ({
    type: ADD_IMG,
    payload: {
        spot,
        img
    }

})


//thunk 1.get all spots
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        // console.log(spots)
        dispatch(loadAllSpots(spots));
        return spots;
    }
}
//thunk 2.get one spot by spotId
export const getOneSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadOneSpot(spot));
        return spot;
    }
}
//thunk 3.get current user spots
export const getCurrentUserSpots = () => async dispatch => {
    const response = csrfFetch(`/api/spots/current`);

    if (response.ok) {
        const currentSpots = await response.json();
        dispatch(current(currentSpots));
        return currentSpots;
    }
};

//thunk 4. add a new spot
export const addSingleSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });

    if (response.ok) {
        const newSpot = await response.json();
        // console.log('new spot added', newSpot)
        dispatch(addSpot(newSpot));
        return newSpot;
    }
}
//thunk 5. update spot
export const editSpot = (spotId, spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(updateSpot(updatedSpot));
        return updatedSpot;
    }
}
//thunk 6. delete spot
export const removeSpots = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteSpot(spotId));
        return null;
    }
}

//thunk 7. add image to spot
export const addSpotImage = (imgUrl, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgUrl)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(addImg(image));
        return image
    };
}


//spot reducer
const initialState = {
    allSpots: {},
    spot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state }
            const allSpots = {};
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            });
            newState.allSpots = allSpots
            return newState

        case ONE_SPOT:
            newState = { ...state }
            newState.allSpots = action.spot;
            console.log('newState')
            console.log(newState.allSpots.name)
            return newState;


        case ADD_SPOT:
            newState = { ...state }
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot };
            newState.spot = { ...state.spot, ...action.spot }
            return newState;

        case CURRENT_SPOTS:
            newState = {}
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
        case UPDATE_SPOT:
            newState = { ...state }
            newState.allSpots = { ...state.allSpots, [action.spot.id]: action.spot };
            newState.spot = { ...state.spot, ...action.spot }
            return newState;

        case DELETE_SPOT:
            newState = { ...state }
            delete newState.allSpots[action.spotId]

        case ADD_IMG:
            newState = { ...state }
            newState.spot = action.payload.spot
            newState.spot.spotImages = [action.payload.img]
            return newState;
        default: return state;
    }
}

export default spotsReducer;