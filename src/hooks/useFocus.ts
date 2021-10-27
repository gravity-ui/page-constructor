import _ from 'lodash';

import {MobileContext} from '../context/mobileContext';
import {useCallback, useContext, useEffect, useState} from 'react';

export default function useFocus(element?: HTMLElement) {
    const {mobile} = useContext(MobileContext);

    const [hasFocus, setHasFocus] = useState(false);
    const setFocus = useCallback(() => setHasFocus(true), []);
    const unsetFocus = useCallback(() => setHasFocus(false), []);

    useEffect(() => {
        if (element) {
            if (mobile) {
                element.addEventListener('pointerdown', setFocus);
            } else {
                element.addEventListener('mouseenter', setFocus);
                element.addEventListener('mouseleave', unsetFocus);
            }

            return () => {
                if (mobile) {
                    element.removeEventListener('pointerdown', setFocus);
                } else {
                    element.removeEventListener('mouseenter', setFocus);
                    element.removeEventListener('mouseleave', unsetFocus);
                }
            };
        }

        return _.noop;
    }, [element, mobile, setFocus, unsetFocus]);

    return {
        hasFocus,
        setFocus,
        unsetFocus,
    };
}
