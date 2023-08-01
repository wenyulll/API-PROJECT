import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import * as spotsActions from '../../store/spots';

import './SpotDetails.css'

// import { useHistory } from "react-router-dom";

export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spots = useSelector(state => state.spots.spot);

    console.log(spots)
    return (
        <div className="">
            <h1>SpotDetails</h1>
        </div>
    )
}

