
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as spotsActions from "../../store/spots";


function DeleteSpot({ spot }) {
    // const spot = useSelector(state => state.spots.spot);
    //  const spot = useSelector(state => state);
    // console.log("sate!!!!!!!!!!! delete",state)
    // console.log("delete spot, &&&&&&&&&&&&&&&,spot",spot)
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async e => {
        e.preventDefault();
        if (window.confirm('Do you want to delete?')) {
            const deleteSpot = await dispatch(spotsActions.removeSpots(spot.id));
            if (deleteSpot) {
                history.push('/spots/current');
            }

        }

    }

    return (
        <button className='delete-button' onClick={handleDelete}>Delete Spot</button>
    )
}

export default DeleteSpot;