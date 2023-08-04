// DeleteReviewModal.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { deleteReviewThunk } from '../../store/reviews';
import { fetchSpotThunk } from '../../store/spots';
// import './CreateReviewModal.css'

function DeleteReviewModal({ reviewId, spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteReview = async (e) => {
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(reviewId))
        if (deletedReview) {
            await dispatch(fetchSpotThunk(spotId));
            await dispatch(closeModal);
        }
    };

    return (
        <div className='delete-modal'>
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to delete this review?</h4>
            <button id='delete-review-yes' onClick={deleteReview}>Yes (Delete Review)</button>
            <button id='delete-review-no' onClick={closeModal}>No (Keep Review)</button>
        </div>
    );
};

export default DeleteReviewModal;
