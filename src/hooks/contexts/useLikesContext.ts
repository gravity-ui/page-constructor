import {useContext} from 'react';

import {LikesContext} from '../../contexts/LikesContext';

export const useLikesContext = () => {
    const likesContextData = useContext(LikesContext);

    return likesContextData;
};
