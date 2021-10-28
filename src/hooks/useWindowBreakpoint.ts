import _ from 'lodash';
import {useEffect, useState} from 'react';
import {BREAKPOINTS} from '../constants';

function calculate(windowWidth: number) {
    const breakpointsSorted = Object.values(BREAKPOINTS).sort((b1, b2) => b1 - b2);

    let result = breakpointsSorted[0];

    for (const breakpoint of breakpointsSorted) {
        if (windowWidth >= breakpoint) {
            result = breakpoint;
        } else {
            return result;
        }
    }

    return result;
}

export default function useWindowBreakpoint() {
    const [breakpoint, setBreakpoint] = useState(BREAKPOINTS.sm);

    useEffect(() => {
        setBreakpoint(calculate(window.innerWidth));

        const detect = _.debounce(() => {
            setBreakpoint(calculate(window.innerWidth));
        }, 100);

        detect();

        window.addEventListener('resize', detect);

        return () => window.removeEventListener('resize', detect);
    }, []);

    return breakpoint;
}
