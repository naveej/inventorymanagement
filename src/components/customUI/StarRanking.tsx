import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';

type Props = {
    onChange?: (rating: number) => void;
}

const StarRating = ({ onChange }: Props) => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
        onChange && onChange(selectedRating);
    };

    return (
        <div className='flex justify-start items-center gap-4 py-2'>
            {[0, 1, 2, 3, 4, 5].map((value, index) => (
                <div key={index} className="flex flex-col justify-center items-center gap-2">
                    <StarIcon
                        key={value}
                        size={24}
                        fill={value <= rating ? 'yellow' : ''}
                        stroke={value <= rating ? 'yellow' : 'gray'}
                        onClick={() => handleStarClick(value)}
                    />
                    <span className='text-[0.9em]'>{value}</span>
                </div>
            ))}
        </div>
    );
};

export default StarRating;