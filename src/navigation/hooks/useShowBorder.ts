import {useEffect, useState} from 'react';

import debounce from 'lodash/debounce';

const useShowBorder = (withBorder: boolean, withBorderOnScroll: boolean) => {
    const [showBorder, setShowBorder] = useState(withBorder);

    useEffect(() => {
        if (!withBorderOnScroll) return () => {};

        const showBorderOnScroll = () => {
            if (!withBorder) {
                setShowBorder(window.scrollY > 0);
            }
        };

        const scrollHandler = debounce(showBorderOnScroll, 20);

        window.addEventListener('scroll', scrollHandler, {passive: true});
        return () => window.removeEventListener('scroll', scrollHandler);
    });

    return [showBorder];
};

export default useShowBorder;
