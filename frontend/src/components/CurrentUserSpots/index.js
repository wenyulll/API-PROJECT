import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import * as spotsActions from "../../store/spots"
import DeleteSpot from "../DeleteSpot"
import "./CurrentUserSpots.css"

//get current user spots
const CurrentUserSpots = () => {

    const spots = useSelector(state => {
        return state.spots.allSpots;
    });
    const spot = useSelector(state => state.spots.spot)
    const sessionUser = useSelector(state => state.session.user);
    const spotsArr = Object.values(spots);
    // console.log('=============', spots)
    const dispatch = useDispatch();
    const history = useHistory();
    const goToSpot = (spotId) => {
        //    dispatch(getOneSpot(spotId))
        history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        dispatch(spotsActions.getCurrentUserSpots())
    }, [dispatch]);

    if (!spotsArr.length) return (
        <div className="user-none-spots">
            <h2>Sorry, you are not a spot owner, become a host today </h2>
        </div>)
    else {
        return (
            <div className="user-spots-page">

                <div className="title-user">
                    <h2> {sessionUser?.firstName}'s spots</h2>
                </div>
                <div className='user-spots'>

                    {spotsArr.map(spot => (
                        <div key={spot.id} className="spot-card-b">

                            <div className='spot-card1' onClick={() => goToSpot(spot.id)} >
                                <div className='spot-image-div'>
                                    <img className='spot-image' src={spot?.previewImage} alt={spot.description} onError={e => { e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg" }} />
                                </div>

                                <div className='location'>{`${spot.city}, ${spot.state}`}</div>
                                <div className='price'>
                                    <span className='number'>{`$${spot.price}`}</span>
                                    <span className='night'>night</span>
                                </div>
                            </div>
                            <div className='spot-avgRating-all-spots' id="user-spot-r">
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <span>{!Number(spot.avgRating) ? 'New' : Number(spot.avgRating).toFixed(1)}</span>

                            </div>
                            {sessionUser && sessionUser.id === spot?.ownerId && (
                                <div className='edit-div'>
                                    {/* <UpdateSpotFormModal spot={spot} /> */}
                                    <DeleteSpot spot={spot} />
                                </div>

                            )}


                        </div>

                    ))}

                </div>
            </div>
        )

    }

}



export default CurrentUserSpots