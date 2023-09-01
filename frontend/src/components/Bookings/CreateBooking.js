import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotBookingThunk } from '../../store/bookings';
import { fetchBookingsThunk } from '../../store/bookings'
import './CreateBooking.css';


function CreateBooking({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [validationErrors, setValidationErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const spotId = spot.id
    // console.log(spotId)
    let cleaningFee = (0.1 * (spot.price)).toFixed(0);
    // console.log('ddddddddd', cleaningFee)
    let serviceFee = (0.05 * (spot.price)).toFixed(0);
    // console.log('ddddddddd', serviceFee)
    let NumberofNights = parseInt((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000);

    useEffect(() => {
        let errors = []
        const today = new Date(Date.now());
        const parsedStartDate = new Date(startDate + "T00:00:00");
        const parsedEndDate = new Date(endDate + "T00:00:00");

        if (today > parsedStartDate || today > parsedEndDate) {
            errors.push("You cannot book past dates or the current day");
        }
        if (parsedStartDate > parsedEndDate) {
            errors.push("The check in date cannot be after the check out date");
        }

        setValidationErrors(errors);

    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert("Please log in to book a spot");
        if (user.id === spot.ownerId) return alert("You cannot book your own spot");

        const data = {
            spotId,
            startDate,
            endDate
        }
        try {
            const createdBooking = await dispatch(createSpotBookingThunk(data));
            if (createdBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                dispatch(fetchBookingsThunk(spotId));

                history.push(`/bookings/current`);
            }
        }

        catch (res) {
            const data = await res.json();
            if (data && data.message) return setValidationErrors([data.message])
        }


    };

    return (

        <div className='booking-div'>
            <form onSubmit={handleSubmit} className="booking-form">
                {validationErrors.length > 0 && (
                    <ul className="errors-list">

                        <li>{validationErrors[0]}</li>

                    </ul>
                )}

                <div className='check-in-out-container'>
                    <div className='check-in-container'>
                        <span className='check-in-text'>CHECK-IN</span>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            min={`${new Date().toLocaleDateString('en-ca')}`}
                            max={`${new Date().getFullYear() + 2}-12-31`}
                            className='form-field'
                            id='check-in'
                        />
                    </div>
                    <div className='check-out-container'>
                        <span className='check-out-text'>CHECKOUT</span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            min={`${new Date(new Date(startDate).getTime() + (1000 * 3600 * 48)).toLocaleDateString('en-ca')}`}
                            max={`${new Date().getFullYear() + 2}-12-31`}

                            className='form-field'
                            id='check-out'
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    id='button-booking-submit'
                    className='submit-button'
                    disabled={validationErrors.length}
                >
                    Reserve
                </button>
            </form>
            <div className='booking-buttom'>
                <div className="booking-form-nocharge-container">
                    <div className="booking-form-nocharge">
                        You won't be charged yet
                    </div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>{`$${spot.price}`} x {NumberofNights < 0 || isNaN(NumberofNights) ? 0 : NumberofNights} nights</div>
                    <div className='booking-form-bttm-right'>{`$${spot.price * (NumberofNights < 0 || isNaN(NumberofNights) ? 0 : NumberofNights)}`}</div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>Cleaning fee</div>
                    <div className='booking-form-bttm-right'>{`$${cleaningFee}`} </div>
                </div>
                <div className='booking-form-bttm-r1'>
                    <div className='booking-form-bttm-left'>Service fee</div>
                    <div className='booking-form-bttm-right'>{`$${serviceFee * (NumberofNights < 0 || isNaN(NumberofNights) ? 0 : NumberofNights)}`} </div>
                </div>
                <div className='booking-form-bttm-r4'>
                    <div className='booking-form-bttm-left2'>Total before taxes</div>
                    <div className='booking-form-bttm-right2'>{`$${spot.price * (NumberofNights < 0 || isNaN(NumberofNights) ? 0 : NumberofNights) + serviceFee * (NumberofNights < 0 || isNaN(NumberofNights) ? 0 : NumberofNights) + cleaningFee}`} </div>
                </div>
            </div>

        </div>


    );
}

export default CreateBooking;
