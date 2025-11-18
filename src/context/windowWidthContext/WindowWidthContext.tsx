import * as React from 'react';

import throttle from 'lodash/throttle';

import {BREAKPOINTS} from '../../constants';

const DEFAULT_WIDTH = BREAKPOINTS.xl;
const UPDATE_FREQUENCY_MS = 100;

export const WindowWidthContext = React.createContext<number>(DEFAULT_WIDTH);

export const WindowWidthProvider = ({children}: React.PropsWithChildren) => {
    const [windowWidth, setWindowWidth] = React.useState(DEFAULT_WIDTH);

    React.useEffect(() => {
        const handleResize = throttle(
            () => {
                setWindowWidth(window.innerWidth);
            },
            UPDATE_FREQUENCY_MS,
            {leading: true},
        );

        handleResize();

        window.addEventListener('resize', handleResize, {passive: true});

        // eslint-disable-next-line consistent-return
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowWidthContext.Provider value={windowWidth}>{children}</WindowWidthContext.Provider>
    );
};

export const useWindowWidth = () => React.useContext(WindowWidthContext);
