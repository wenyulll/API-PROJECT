import { csrfFetch } from "./csrf";


// action type 
const LOAD_SPOTS = 'spots/LOAD_SPOTS' //1. get all spots
const LOAD_SPOT = 'spots/LOAD_SPOT' //2. get one spot by spotId 
const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS' //3. get current user spots
const CREATE_SPOT = 'spot/CREATE_SPOT';//4. add a new spot
// const UPDATE_SPOT = 'spots/UPDATE_SPOT' //5. update spot
const DELETE_SPOT = 'spots/DELETE_SPOT' //6. delete spot

//action creators
//1.get all spots
const loadSpotsAction = (spots) => ({
    type: LOAD_SPOTS,
    spots
})
//2.get one spot by spotId
const loadSpotAction = (spot) => ({
    type: LOAD_SPOT,
    spot
})
//3.get current user spots
const loadCurrentSpotsAction = (spots) => ({
    type: LOAD_CURRENT_SPOTS,
    spots
})
//4. add a new spot
const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot
})
// //5. update spot 
// const updateSpot = (spot) => ({
//     type: UPDATE_SPOT,
//     spot

// })
//6. delete spot
const deleteSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})



//thunk 1.get all spots
export const fetchSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    // console.log('responsesssss', response)
    // console.log('spotIdddddddddds', spotId)
    if (response.ok) {
        const spots = await response.json();

        dispatch(loadSpotsAction(spots.Spots));
    };
};

//thunk 2.get one spot by spotId
export const fetchSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();

        dispatch(loadSpotAction(spot));
    };
};
//thunk 3.get current user spots
export const fetchCurrentSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();

        dispatch(loadCurrentSpotsAction(spots.Spots));
    };
}

//thunk 4. add a new spot
export const createSpotThunk = (createSpot) => async (dispatch) => {

    try {
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
            otherImages
        } = createSpot;

        const createImage = {
            url: previewImage,
            preview: true
        };

        const imagesArr = []
        otherImages.forEach(image => {
            if (image.url.length) imagesArr.push(image.url)
        })

        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
        });

        if (response.ok) {

            const spot = await response.json();

            const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createImage)
            })

            for (let i = 0; i < imagesArr.length; i++) {
                let imageUrl = imagesArr[i]
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: imageUrl, preview: false })
                })
            }
            if (imageResponse.ok) {
                dispatch(createSpotAction(spot))
                return spot
            }
        }

    } catch (e) {
        const errors = await e.json();
        return errors
    };
};

// //thunk 5. update spot
// export const editSpot = (spotId, spot) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot)
//     })
//     if (response.ok) {
//         const updatedSpot = await response.json();
//         dispatch(updateSpot(updatedSpot));
//         return updatedSpot;
//     }
// }

export const updateSpotThunk = (updateSpot) => async (dispatch) => {
    const {
        id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price } = updateSpot;

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpotAction(spot))
        return spot
    } else {
        const errors = await response.json();
        return errors
    };
}

//thunk 6. delete spot
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpotAction(spotId));
        return spot
    };
};



//spot reducer
const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state, allSpots: {}, singleSpot: {} };
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            })
            return newState;
        };
        case LOAD_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
            newState.singleSpot = action.spot;
            return newState;
        };
        case LOAD_CURRENT_SPOTS: {
            const newState = { allSpots: {}, singleSpot: {} };
            action.spots.forEach((spot) => {
                newState.allSpots[spot.id] = spot;
            })
            return newState;
        };
        case CREATE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        };
        case DELETE_SPOT: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spotId];
            return newState;
        };
        default:
            return state;
    };
}

export default spotsReducer;
