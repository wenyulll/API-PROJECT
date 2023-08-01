import { useEffect, useState } from "react";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotsActions from '../../store/spots';

import './Spots.css'
import { useHistory } from "react-router-dom";

const Spots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots.allSpots);
    const history = useHistory()
    const spotsArr = Object.values(spots);
    const goToSpot = (spotId) => {
        // dispatch(spotsActions.getOneSpot(spotId))
        history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        dispatch(spotsActions.getAllSpots())
        // console.log(spots)
    }, [dispatch]);

    if (!spotsArr.length) return null

    return (
        <div className='card'>
            <div className="spots-list">
                {spotsArr.map(spot => spot?.previewImage && (
                    <div key={spot.id} >

                        <div className='spot-card' onClick={() => goToSpot(spot.id)} >
                            <div className='img-container'>
                                <img className='spot-image' src={spot?.previewImage} alt={spot.description} onError={e => { e.currentTarget.src = "https://unblast.com/wp-content/uploads/2019/06/404-Error-Page-Donut-Template.jpg" }} />
                            </div>

                            <div className='location'>{`${spot.city}, ${spot.state}`}</div>
                            <div className='price'>
                                <span className='number'>{`$${spot.price}`}</span>
                                <span className='night'>night</span>
                            </div>
                            <div className='spot-avgRating-all-spots'>
                                <i className="fa-regular fa-star"></i>
                                <span>{!Number(spot.avgRating) ? 'New' : Number(spot.avgRating).toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default Spots;