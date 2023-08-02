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
        <div className='delete-modal'>
            <h1>Confirm Delete</h1>
            <button id='delete-spot-yes' onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button id='delete-spot-no' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    );
};

export default DeleteSpotModal;
