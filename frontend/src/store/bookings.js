import { csrfFetch } from "./csrf";

// action type 
export const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS'
export const LOAD_CURRENT_BOOKINGS = 'bookings/LOAD_BOOKINGS'
export const CREATE_BOOKING = 'booking/CREATE_BOOKING'
// export const UPDATE_BOOKING = 'UPDATE_BOOKING'
export const DELETE_BOOKING = 'booking/UPDATE_BOOKING'

//action creators
// 1.get all bookings
export const loadBookingsAction = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
})

//2.get current user bookings
export const loadCurrentBookingsAction = (bookings) => ({
    type: LOAD_CURRENT_BOOKINGS,
    bookings
})

//3.create a booking
export const createBookingAction = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

//4.update a booking
// const editBookingAction = (booking) => ({
//     type: UPDATE_BOOKING,
//     booking
// })

//5. delete a booking
export const deleteBookingAction = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
})

//thunk 1. get all bookings
export const fetchBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`api/spots/${spotId}/bookings`);


    if (response.ok) {
        const bookings = await response.json();

        dispatch(loadBookingsAction(bookings));
        return bookings
    };
};

//thunk 2.get bookings by the current user

//thunk 3. create a booking
export const createSpotBookingThunk = (data) => async (dispatch) => {

    const { spotId, startDate, endDate } = data

    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate }),

        if(response.ok) {
            const booking = await response.json();
    await dispatch(createBookingAction(booking));
    return booking;

})
    }
}



const initialStat = { allBookings: {}, singleBooking: {}, userBooking: {} }

const bookingsReducer = (state = initialStat, action) => {

    console.log("this is accccctionnnnnn", action);
    let newState = {}
    switch (action.type) {

        case CREATE_BOOKING:
            newState = { ...state, allBookings: { ...state.allBookings }, singleBooking: {} };
            const newBooking = { ...action.booking };
            newState.allBookings[action.booking.id] = newBooking;
            newState.singleBooking = newBooking;
            newState.userBookings[action.booking.id] = newBooking;
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer