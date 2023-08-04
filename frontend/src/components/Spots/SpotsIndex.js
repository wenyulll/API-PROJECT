import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotsThunk } from "../../store/spots";
import { useEffect } from 'react';
import SpotIndexItem from './SpotIndexItem.js';
import './spots.css';


function SpotsIndex() {
    const dispatch = useDispatch();
    const spots = Object.values(
        useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
    );

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch]);

    if (!spots.length) return null;

    return (
        <div className='index'>
            <div className='spots-container'>
                <ul className='spots-grid'>
                    {spots.map((spot) => (
                        <li key={spot.id}>
                            <SpotIndexItem spot={spot} page='all' />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};

export default SpotsIndex;