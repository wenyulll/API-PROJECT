import SpotForm from './SpotForm';
import './spotform.css';
function CreateSpotForm() {
    const spot = {
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: '',
        previewImage: '',
        img2Url: '',
        img3Url: '',
        img4Url: '',
        img5Url: ''
    }

    return (
        <div>
            <SpotForm spot={spot} formType='Create' formTitle='Create a New Spot' />
        </div>
    )
};

export default CreateSpotForm;