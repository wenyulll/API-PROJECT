import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotThunk } from '../../store/spots';
import { useEffect } from 'react';
// import ReviewsIndex from '../Reviews/ReviewsIndex';
import './spotShow.css';

function SpotShow() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot ? state.spots.singleSpot : {});
    const mainImage = useSelector(state => state.spots.singleSpot?.SpotImages?.length > 0 ? state.spots.singleSpot.SpotImages[0] : [])
    const otherImages = useSelector(state => state.spots.singleSpot?.SpotImages?.length > 1 ? state.spots.singleSpot.SpotImages.slice(1, 5) : [])
    const spotOwner = useSelector(state => state.spots.singleSpot?.Owner ? state.spots.singleSpot.Owner : {})

    useEffect(() => {
        dispatch(fetchSpotThunk(spotId))
    }, [dispatch, spotId]);

    const handleClick = () => {
        alert('Feature coming soon.')
    }

    if (!spot) return null;

    return (
        <div className='spotDetails'>
            <div className='spotDetails-header'>
                <h2 className='spotDetails-title'>{spot.name}</h2>
                <p className='spotDetails-location'>{spot.city}, {spot.state}, {spot.country}</p>
            </div>
            <div className='spotDetails-images'>
                <div className='spotDetails-previewContainer'>
                    <img alt='spot-preview' className='spotDetails-previewImage' src={mainImage.url} />
                </div>
                <div className='spotDetails-otherImagesContainer'>
                    {(otherImages.length > 0) ? otherImages.map(image => (
                        <img alt='other' key={image.id} className='spotDetails-otherImages' src={image.url} />
                    )) : ''}
                </div>
            </div>
            <div className='spotDetails-detailsContainer'>
                <div className='spotDetails-details'>
                    <h2>Hosted by {spotOwner.firstName} {spotOwner.lastName}</h2>
                    <p className='spotDetails-description'>{spot.description}</p>
                </div>
                <div className='spotDetails-reservationContainer'>
                    <div className='reservation-price-stars'>
                        <span className='spotDetails-reservation-price'>${spot?.price ? parseInt(spot.price).toFixed(1) : 0} night</span>
                        <span className='spotDetails-reservation-rating'><i className='fas fa-star' />{spot.numReviews > 0 ? spot.numReviews === 1 ? `${spot.avgStarRating.toFixed(1)} · ${spot.numReviews} review` : `${spot.avgStarRating.toFixed(2)} · ${spot.numReviews} reviews` : ' New'}</span>
                    </div>
                    <div className='spotDetails-reservation-buttonContainer'>
                        <button className='spotDetails-reservation-button' onClick={handleClick}>Reserve</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SpotShow;
