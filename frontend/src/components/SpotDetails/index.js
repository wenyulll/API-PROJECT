import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';

// import checkIn from "../../images/check-in.png"
// import holder from "../../images/super-holder.png"
// import cancel from "../../images/cancel.png"
// import cover from "../../images/aircover.png"
import './SpotDetails.css'

// import { useHistory } from "react-router-dom";
// import Reviews from '../Reviews';
export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.AllSpots);
    const sessionUser = useSelector(state => state.session.user);
    // const reviews = useSelector(state => state.reviews.spot)
    dispatch(spotsActions.getOneSpot(spotId))

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId))
        //  console.log("dispatch+++++++++++++++++",)
        console.log('spot')
        console.log(spot)
    }, [dispatch, spotId])

    // if (!spot.SpotImages) {
    //     //  console.log("Object_-------------")
    //     return null;
    // }
    // const name = spot.name
    if (!spot) return null

    return (
        // <div>ddd</div>
        <div className='singlespot-details'>
            <div className="single-spot-top">
                <h2>{spot.name}</h2>


            </div>
        </div>
    )
}