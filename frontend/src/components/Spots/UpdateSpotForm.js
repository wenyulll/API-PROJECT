import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchSpotsThunk } from "../../store/spots";
import SpotForm from './SpotForm';
import './spotform.css';

function UpdateSpotForm() {
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector((state) => state.spots.allSpots ? state.spots.allSpots[spotId] : '')

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])

    if (!spot) return null;

    return (
        <div>
            <SpotForm spot={spot} formType='Update' formTitle='Update your Spot' />
        </div>
    )
};

export default UpdateSpotForm;
