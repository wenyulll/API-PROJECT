import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import AddSpotForm from './AddSpotForm';

function AddSpotFormModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='add-spot'>

                <div className='become-host' onClick={() => setShowModal(true)}>Become a Host</div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <AddSpotForm setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default AddSpotFormModal;
