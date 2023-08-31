import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpotBookingThunk } from '../../store/bookings';
import './CreateBooking.css';


function CreateBooking({ spot }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [validationErrors, setValidationErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const spotId = spot.id

    let cleanFee = 100;
    let serviceFee = 10;

    useEffect(() => {
        let errors = []

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            spotId,
            startDate,
            endDate
        }

        const createdBooking = await dispatch(createSpotBookingThunk(data));


    }
}

export default CreateBooking;
