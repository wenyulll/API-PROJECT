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
// import { useParams } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { fetchSpotsThunk } from "../../store/spots";
// import SpotForm from './SpotForm';
// import './spotform.css';

// function UpdateSpotForm() {
//     const dispatch = useDispatch();
//     const { spotId } = useParams();

//     const spot = useSelector((state) => state.spots.allSpots ? state.spots.allSpots[spotId] : '')

//     useEffect(() => {
//         dispatch(fetchSpotsThunk())
//     }, [dispatch])

//     // Add validation logic for the SpotForm
//     const validateSpotForm = (SpotForm) => {
//         // Implement your validation logic here
//         // For example, you might use a library like Formik/Yup or write custom validation functions
//         // Return true if the spotData is valid, otherwise return false
//         // For example, if you're using Formik, you can use its `validate` prop to pass validation function to the SpotForm
//         // Or if you have custom validation functions, you can call them here and return the result
//         return true; // Replace this with your actual validation logic
//     };

//     // Handle the form submission
//     const handleSubmit = (spotData) => {
//         // Validate the spotData using the validateSpotForm function
//         const isValid = validateSpotForm(spotData);

//         if (isValid) {
//             // Dispatch an action to update the spot with the updated data
//             // Replace 'updateSpotAction' with the actual action creator for updating the spot
//             // For example, you might have an action like 'updateSpotAction(spotData)' to update the spot
//             // dispatch(updateSpotAction(spotData));
//             console.log("Spot data is valid. Submitting...");
//         } else {
//             console.log("Spot data is invalid. Please check your inputs.");
//         }
//     };

//     if (!spot) return null;

//     return (
//         <div>
//             {/* Pass the handleSubmit function as a prop to the SpotForm */}
//             <SpotForm spot={spot} formType='Update' formTitle='Update your Spot' onSubmit={handleSubmit} />
//         </div>
//     )
// };

// export default UpdateSpotForm;
