import { useState } from 'react';
import './CreateReviewModal.css'

const ReviewRating = ({ stars, disabled, onChange }) => { //stars（当前评分星级）、disabled（评分星级是否可编辑）、onChange（评分星级改变事件的回调函数）。
    const [activeRating, setActiveRating] = useState(stars);
    // useState hook 创建了状态变量 activeRating，它表示用户当前激活的评分星级。activeRating 的初始值被设置为传入的 stars 属性值。
    const starsIcon = (number) => {
        const handleMouseEnter = () => setActiveRating(number);
        const handleMouseLeave = () => setActiveRating(stars);
        const handleClick = () => onChange(number);

        const isFilled = activeRating >= number;
        const starClassName = isFilled ? "fa fa-star" : "fa fa-star-o";

        return (
            <div
                key={number}
                className={starClassName}
                onMouseEnter={!disabled ? handleMouseEnter : undefined}
                onMouseLeave={!disabled ? handleMouseLeave : undefined}
                onClick={!disabled ? handleClick : undefined}
            />
        );
    };

    return (
        <div className="reviewRating-input">
            {[1, 2, 3, 4, 5].map((number) => starsIcon(number))}
            <span> Stars </span>
        </div>
        //通过 map 方法生成一个包含 1 到 5 的星级图标的数组，并将结果渲染出来。
    );
};

export default ReviewRating;

