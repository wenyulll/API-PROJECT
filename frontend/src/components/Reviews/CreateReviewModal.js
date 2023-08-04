// CreateReviewModal.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import { fetchSpotThunk } from "../../store/spots";
import ReviewRating from "./ReviewRatingFeature";
import './CreateReviewModal.css'

function CreateReviewModal({ spotId, user, spotReview, className }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [stars, setStars] = useState(spotReview.stars);
    const [review, setReview] = useState(spotReview.review);
    const [errors, setErrors] = useState({});


    const onChange = (number) => {
        setStars(parseInt(number));
    }; //处理星星评级，接收一个参数

    const handleSubmit = async (e) => {
        e.preventDefault();  //默认阻止表单自动刷新
        setErrors({});

        const newReview = await dispatch(createReviewThunk({ ...spotReview, stars, review, user }))
        if (newReview) {
            if (newReview.errors) {
                setErrors(newReview.errors);
            } else {
                await dispatch(fetchSpotThunk(spotId), [dispatch])
                    .then(closeModal)
            }
        }   //触发creatReviewThunk 然后返回一个新的state
    };

    return (
        <div className={className}>
            <h2>How was your stay?</h2>
            <div className='errors'>{errors.review}</div>
            <div className='reviewTextArea'>
                <textarea
                    className='review-text-input'
                    value={review}
                    onChange={(e) => {
                        setReview(e.target.value)   //e.target.value表示用户输入的内容，然后setReview函数用于更新review状态，将新的输入内容更新到review变量中。
                    }}
                    placeholder="Leave your review here..."
                />
            </div>
            <div className='review-stars'>
                <ReviewRating stars={stars} disabled={false} onChange={onChange} />
            </div>
            {/* disabled属性被设置为false,表示ReviewRating组件中的评分星级是可点击和可编辑的状态。 */}
            <div className='errors'>{errors.stars}</div>
            {/* errors.stars是从errors对象中提取出与评分相关的错误信息并显示在页面上。 */}
            <button id={(stars < 1 || review.length < 10) ? 'disabled-submit-review-button' : 'enabled-submit-review-button'} disabled={stars < 1 || review.length < 10} onClick={handleSubmit}>Submit Your Review</button>
            {/* id: 这是button元素的id属性。它使用条件（ternary）表达式来根据评分和评论内容的长度判断当前按钮的id。如果stars小于1或review的长度小于10，
            按钮的id将设置为'disabled-submit-review-button'，否则设置为'enabled-submit-review-button'。这样可以根据按钮的状态来定义不同的CSS样式。 */}
        </div>
    )
}

export default CreateReviewModal;
