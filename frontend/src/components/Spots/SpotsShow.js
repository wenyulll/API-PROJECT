import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotThunk } from '../../store/spots';
import { useEffect } from 'react';
import './spotShow.css';
import ReviewIndex from '../Reviews/ReviewsIndex';

function SpotShow() {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    // state.spots.singleSpot 包含当前房屋的信息。如果 state.spots.singleSpot 存在，则将其值赋给 spot，否则将 spot 设置为空对象 {}。
    const spot = useSelector(state => state.spots.singleSpot ? state.spots.singleSpot : {});
    //  state.spots.singleSpot.SpotImages 存在且长度大于 0，则将其第一个元素赋给 mainImage，否则将 mainImage 设置为[]。
    const mainImage = useSelector(state => state.spots.singleSpot?.SpotImages?.length > 0 ? state.spots.singleSpot.SpotImages[0] : []);
    const otherImages = useSelector(state => state.spots.singleSpot?.SpotImages?.length > 1 ? state.spots.singleSpot.SpotImages.slice(1, 5) : []);
    const spotOwner = useSelector(state => state.spots.singleSpot?.Owner ? state.spots.singleSpot.Owner : {});//看spotowner


    useEffect(() => {
        dispatch(fetchSpotThunk(spotId))
    }, [dispatch, spotId]);

    const showAlert = (e) => {
        e.preventDefault();
        alert('Feature Comming Soon');
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
                        <span className='spotDetails-reservation-rating'><i className='fas fa-star' />{spot.numReviews > 0 ? spot.numReviews === 1 ? `${Number(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} review` : `${Number(spot.avgStarRating).toFixed(1)} · ${spot.numReviews} reviews` : ' New'}</span>
                    </div>
                    <div className='spotDetails-reservation-buttonContainer'>
                        <button className='spotDetails-reservation-button' onClick={showAlert}>Reserve</button>
                    </div>
                </div>
            </div>
            <div className='spotDetails-reviewsContainer'>
                <ReviewIndex spot={spot} spotId={spotId} />
            </div>
        </div>

    );
};

export default SpotShow;
