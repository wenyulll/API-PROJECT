import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";
import './index.css';

function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteSpot = (e) => {
        e.preventDefault();
        return dispatch(deleteSpotThunk(spotId))
            .then(closeModal)
    };

    return (
        <div className='delete-spot'>
            <h1>Confirm Delete</h1>
            <h2 style={{ width: "400px" }}>Are you sure you want to remove this spot from the listings</h2>
            <button id='yes' onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button id='no' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpotModal;