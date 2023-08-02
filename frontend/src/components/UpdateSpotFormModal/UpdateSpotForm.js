import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import './UpdateSpotForm.css'

const UpdateSpotForm = ({ spot, setShowModal }) => {

    // const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    // const { spotId } = useParams();

    // const spot = useSelector(state => state.spots.spot)

    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    // useEffect(() => {
    //     dispatch(spotsActions.getOneSpot(spotId))

    // }, [dispatch, spotId])


    useEffect(() => {

        const errors = [];

        if (!name.length) {
            errors.push("Name is required");
        }
        else if (name.length > 100) {
            errors.push("Name must be less than 100 characters");
        }
        if (!description.length) {
            errors.push("Description is required");
        }

        else if (description.length > 500) {
            errors.push("Description must be less than 500 characters");
        }


        if (!address.length) {
            errors.push("Address is required");
        } else if (address.length > 100) {
            errors.push("Address must be less than 100 characters");
        }
        if (!country.length) {
            errors.push("Country is required");
        } else if (country.length > 50) {
            errors.push("Country must be less than 50 characters");
        }

        if (!state.length) {
            errors.push("State is required");
        } else if (state.length > 50) {
            errors.push("State must be less than 50 characters");
        }

        if (!city.length) {
            errors.push("City is required");
        } else if (city.length > 50) {
            errors.push("City must be less than 50 characters");
        }
        if (!lat || isNaN(lat)) {
            errors.push("Latitude is required and must be number between -90 and 90")
        } else if (lat < -90 || lat > 90) {
            errors.push("Latitude must be between -90 and 90");
        }
        if (!lng || isNaN(lng)) {
            errors.push("Longitude is requiredand must be number between -180 and 180")
        } else if (lng < -180 || lng > 180) {
            errors.push("Longitude must be between -180 and 180");
        }

        if (!price) {
            errors.push("Price is required");
        } else if (Number(price) <= 0 || isNaN(price)) {
            errors.push("Price must be a number and greater than 0");
        }

        setValidationErrors(errors);

        // }

    }, [name,
        description,
        address,
        price,
        city,
        state,
        country,
        lat,
        lng,
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Validation Errors Cannot Submit`);
        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price
        }
        if (!validationErrors.length) {
            // console.log("updatedSpot spot.id ??????????///", spot.id)
            const updatedSpot = await dispatch(spotsActions.editSpot(+spot.id, newSpot,))

            if (updatedSpot) {
                setValidationErrors([]);
                setShowModal(false)
                history.push(`/spots/${updatedSpot.id}`);
                // history.push("/spots/current");

            }


        };
    }

    return (
        <>
            <div className='add-spot-wrap2'>


                <form onSubmit={handleSubmit} className="update-spot-form">
                    <div className='add-spot-input'>
                        <div className='add-spot-title'>
                            <h3>Update Your Spot</h3>
                        </div>
                        <div className='errorslist-div'>
                            {hasSubmitted && validationErrors.length > 0 && (
                                <ul className="errors">
                                    {validationErrors.map((error) => <li key={error} className="error">{error}</li>)}
                                </ul>

                            )}
                        </div>
                        <div className='spot-input-info'>

                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Name
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Description
                                    </div>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></input>
                                </label>
                            </div>

                            <div className='spot-i'>
                                <label>


                                    <div className='input-m'>
                                        Price
                                    </div>
                                    <div className='price-input'>
                                        <input
                                            type="text"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        >

                                        </input>
                                    </div>
                                </label>

                            </div>



                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Address
                                    </div>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required

                                    />
                                </label>
                            </div>
                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        City
                                    </div>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        State
                                    </div>
                                    <input
                                        type="text"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Country
                                    </div>
                                    <input
                                        type="text"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Latitude
                                    </div>
                                    <input
                                        type="text"
                                        // min="-90"
                                        // max="90"
                                        value={lat}
                                        onChange={(e) => setLat(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>

                            <div className='spot-i'>
                                <label>
                                    <div className='input-m'>
                                        Longitude
                                    </div>
                                    <input
                                        type="text"
                                        // min="-120"
                                        // max="120"
                                        value={lng}
                                        onChange={(e) => setLng(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>


                        </div>

                    </div>

                    <div className='addSpot2-div'>
                        <button type="submit"
                            disabled={hasSubmitted && validationErrors.length > 0}
                            className="updateSpot1-button"
                        >Edit Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default UpdateSpotForm
