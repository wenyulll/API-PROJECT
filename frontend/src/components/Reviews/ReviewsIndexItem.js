import React from 'react';
import { useSelector } from 'react-redux';
import DeleteReviewModal from './DeteleReviewModal';
import OpenModalButton from '../OpenModalButton';

function ReviewIndexItem({ review, spotId }) {
    const sessionUser = useSelector((state) => state.session.user);


    // 使用评论的创建时间，获取月份和年份信息
    const createdAtDate = new Date(review.createdAt);
    const month = createdAtDate.toLocaleString('en', { month: 'long' });
    const year = createdAtDate.getFullYear();



    // 创建一个变量来存储删除评论按钮元素
    let deleteReviewButton;

    if (sessionUser) {

        if (sessionUser.id === review.userId) {

            deleteReviewButton = (
                <OpenModalButton
                    className='modal-dialog'
                    buttonText='Delete'
                    modalComponent={<DeleteReviewModal className='delete-modal' reviewId={review.id} spotId={spotId} />}
                />
            )
        }
    }

    return (
        <div className='reviewIndexItemContainer'>
            <div className='reviewIndexItem-name'>{review.User.firstName}</div>
            <div className='reviewIndexItem-date'>{month} {year}</div>
            <div className='reviewIndexItem-text'>
                {review.review}
            </div>
            {sessionUser && deleteReviewButton}
        </div>
    )
}

export default ReviewIndexItem;