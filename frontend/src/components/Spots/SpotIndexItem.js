import { NavLink, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import './spots.css';


function SpotIndexItem({ spot, page }) {

    const history = useHistory();

    const updateForm = () => {
        history.push(`/spots/${spot.id}/edit`)
    }

    // console.log("spot")
    // console.log(spot)
    // console.log("spot.avgRating")
    // console.log(spot.avgRating)
    // console.log("spot.avgRating.toFixed(1)")
    // console.log(typeof spot.avgRating)
    // console.log("Number(spot.avgRating).toFixed(1)")
    // console.log(Number(spot.avgRating).toFixed(1))

    return (

        <div className='spotIndexItem-Card'>
            <span data-tooltip={`${spot.name}`}>
                <NavLink className='links' exact to={`/spots/${spot.id}`}>
                    <div className='spotIndexItem-ImageContainer'>
                        <img alt='spot-preview' className='spotIndexItem-Image' src={spot.previewImage} />
                    </div>
                    <div className='spotIndexItem-DetailsContainer'>
                        <div className='spotIndexItem-header'>
                            <span className='spotIndexItem-location'>{spot.city}, {spot.state}</span>
                            <span className='spotIndexItem-stars'><i className='fa-solid fa-star' />{spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}</span>
                        </div>
                        <div>
                            <span className='spotIndexItem-price links'>${spot?.price ? parseInt(spot.price).toFixed(1) : ''}</span>
                            <span> night</span>
                        </div>
                    </div>
                </NavLink>
                {page === 'current' && (
                    <div>
                        <button className='modal-button' onClick={updateForm}>Update</button>

                        <span className='open-modal-button'>
                            <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteSpotModal spotId={spot.id} />}
                            />
                        </span>

                    </div>
                )}
            </span>
        </div>

    )
}


export default SpotIndexItem;
