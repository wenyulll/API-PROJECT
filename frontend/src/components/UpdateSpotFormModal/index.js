
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateSpotForm from './UpdateSpotForm';

function UpdateSpotFormModal({ spot }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <button className="updateSpot-button" onClick={() => setShowModal(true)}>Edit Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateSpotForm spot={spot} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default UpdateSpotFormModal;