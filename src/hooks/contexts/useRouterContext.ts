import {useContext} from 'react';

import {RouterContext} from '../../contexts/RouterContext';

export const useRouterContext = () => {
    const routerContextData = useContext(RouterContext);

    return routerContextData;
};
