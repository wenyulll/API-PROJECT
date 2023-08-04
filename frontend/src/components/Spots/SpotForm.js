import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk, updateSpotThunk } from '../../store/spots';
import './spotform.css';

function SpotForm({ spot, formType, formTitle }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.previewImage);
    const [img2Url, setImg2Url] = useState(spot?.img2Url);
    const [img3Url, setImg3Url] = useState(spot?.img3Url);
    const [img4Url, setImg4Url] = useState(spot?.img4Url);
    const [img5Url, setImg5Url] = useState(spot?.img5Url);
    const [errors, setErrors] = useState({});


    const otherImages = [{ url: img2Url }, { url: img3Url }, { url: img4Url }, { url: img5Url }]

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        let resErrors = {};
        spot = {
            ...spot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
            otherImages
        }

        if (address.length < 1) resErrors.address = 'Address is required';
        if (city.length < 1) resErrors.city = 'City is required';
        if (state.length < 1) resErrors.state = 'State is required';
        if (country.length < 1) resErrors.country = 'Country is required';
        if (description.length < 30) resErrors.description = 'Description needs a minimum of 30 characters';
        if (name.length < 1) resErrors.name = 'Name is required';
        if (!price || price <= 0) resErrors.price = 'Price is required';
        if (previewImage.length < 1) resErrors.previewImage = 'Preview image is required';

        if (Object.values(resErrors).length > 0) {
            setErrors(resErrors);
        } else {
            if (formType === 'Create') {
                const newSpot = await dispatch(createSpotThunk(spot))
                spot = newSpot

            } else if (formType === 'Update') {
                const newSpot = await dispatch(updateSpotThunk(spot))
                spot = newSpot
            }

            if (spot.errors) {
                resErrors = spot.errors
                if (previewImage.length < 1) {
                    resErrors.previewImage = 'Preview image is required.'
                }
                let objValArr = Object.values(spot.errors);
                objValArr.forEach(error => {
                    if (error.path) {
                        resErrors[error.path] = error.message
                    }
                });
                setErrors(resErrors);
            } else {
                history.push(`/spots/${spot.id}`);
            }
        };
    };

    return (
        <form className='spot-form' onSubmit={handleSubmit}>
            <h2>{formTitle}</h2>
            <div className='spot-form-div'>
                <h3>Where's your place located?</h3>
                <p className='location-blurb'>Guests will only get your exact address once they booked a reservation.</p>
                <div className='spot-form-Country'>
                    <label>Country</label>
                    <span className='errors errors-above'>{errors.country}</span>
                    <input
                        className='form-inputs country-input'
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <div className='spot-form-Address'>
                    <label>Street Address</label>
                    <span className='errors errors-above'>{errors.address}</span>
                    <input
                        type='text'
                        className='form-inputs street-input'
                        placeholder='Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className='spot-form-City-State'>
                    <div className='spot-form-City'>
                        <label>City</label>
                        <span className='errors errors-above'>{errors.city}</span>
                        <input
                            type='text'
                            className='form-inputs city-input'
                            placeholder='City'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className='form-comma'>,</div>
                    <div className='spot-form-State'>
                        <label>State</label>
                        <span className='errors errors-above'>{errors.state}</span>
                        <input
                            className='form-inputs state-input'
                            type='text'
                            placeholder='State'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                </div>

                <div className='spot-form-lat-lng'>
                    <div className='spot-form-lat'>
                        <label>Latitude</label>
                        <span className='errors errors-above'>{errors.lat}</span>
                        <input
                            className='form-inputs lat-input'
                            type='number'
                            placeholder='Latitude'
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                    </div>
                    <div className='form-comma'>,</div>
                    <div className='spot-form-lng'>
                        <label>Longitude</label>
                        <span className='errors errors-above'>{errors.lng}</span>
                        <input
                            className='form-inputs lng-input'
                            type='number'
                            placeholder='Longitude'
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='spot-form-div'>
                <h3>Describe your place to guests</h3>
                <p>
                    Mention the best features of your space, any special amentities like
                    fast wifi or parking, and what you love about the neighborhood.
                </p>
                <textarea
                    className='form-textarea'
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className='errors errors-below'>{errors.description}</div>
            </div>

            <div className='spot-form-div'>
                <h3>Create a title for your spot</h3>
                <p>
                    Catch guests' attention with a spot title that highlights what makes
                    your place special.
                </p>
                <input
                    className='form-inputs name-input'
                    type='text'
                    placeholder='Name of your spot'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className='errors errors-below'>{errors.name}</div>
            </div>

            <div className='spot-form-div'>
                <h3>Set a base price for your spot</h3>
                <p>
                    Competitive pricing can help your listing stand out and rank higher
                    in search results.
                </p>
                <div className='price-input-div'>$
                    <input
                        className='form-inputs price-input'
                        type='number'
                        placeholder='Price per night (USD)'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className='errors errors-below'>{errors.price}</div>
            </div>
            {/* -------------------------插入图片-------------------------------------- */}
            <div className='form-photos spot-form-div'>
                <h3>Liven up your spot with photos</h3>
                <p>
                    Submit a link to at least one photo to publish your spot.
                </p>
                <input
                    type='url'
                    className='form-inputs form-images'
                    placeholder='Preview Image URL'
                    value={previewImage}
                    onChange={(e) => setPreviewImage(e.target.value)}
                />
                <div className='errors errors-photos'>{errors.previewImage}</div>
                <input
                    type='url'
                    className='form-inputs form-images'
                    placeholder='Image URL'
                    value={img2Url}
                    onChange={(e) => setImg2Url(e.target.value)}
                />
                <div className='errors errors-photos'>{errors.img2Url}</div>
                <input
                    type='url'
                    className='form-inputs form-images'
                    placeholder='Image URL'
                    value={img3Url}
                    onChange={(e) => setImg3Url(e.target.value)}
                />
                <div className='errors errors-photos'>{errors.img3Url}</div>
                <input
                    type='url'
                    className='form-inputs form-images'
                    placeholder='Image URL'
                    value={img4Url}
                    onChange={(e) => setImg4Url(e.target.value)}
                />
                <div className='errors errors-photos'>{errors.img4Url}</div>
                <input
                    type='url'
                    className='form-inputs form-images'
                    placeholder='Image URL'
                    value={img5Url}
                    onChange={(e) => setImg5Url(e.target.value)}
                />
                <div className='errors errors-photos'>{errors.img5Url}</div>

            </div>

            <button id='create-form-submit-button' type='submit'>{formType} Spot</button>
        </form>
    );
}

export default SpotForm;
