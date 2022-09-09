import {useState, useCallback} from 'react';

import {ToggleLikeCallbackType} from '../models/blog';

type UseLikesProps = {
    hasLike?: boolean;
    count?: number;
    postId?: number;
    toggleLikeCallback: ToggleLikeCallbackType;
};

type UseLikeData = {
    likesCount: number;
    hasUserLike: boolean;
    handleLike: () => void;
};

type UseLikesType = (props: UseLikesProps) => UseLikeData;

export const useLikes: UseLikesType = ({hasLike, count, toggleLikeCallback, postId}) => {
    const [hasUserLike, setHasUserLike] = useState(hasLike ?? false);
    const [likesCount, setLikesCount] = useState(count ?? 0);

    const handleLike = useCallback(() => {
        let newLikesCount = likesCount;

        if (hasUserLike && likesCount > 0) {
            newLikesCount--;
        }

        if (!hasUserLike) {
            newLikesCount++;
        }

        setHasUserLike(!hasUserLike);
        setLikesCount(newLikesCount);

        toggleLikeCallback({
            postId,
            hasLike: !hasUserLike,
        });
    }, [hasUserLike, likesCount, postId, toggleLikeCallback]);

    return {
        likesCount,
        hasUserLike,
        handleLike,
    };
};
