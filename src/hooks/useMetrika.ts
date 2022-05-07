import {useContext} from 'react';
import {MetrikaContext} from '../context/metrikaContext';
import {ButtonPixel, MetrikaGoal, isNewMetrikaFormat} from '../models';

export const useMetrika = () => {
    const {metrika, pixel} = useContext(MetrikaContext);

    return ({
        metrikaGoals,
        pixelEvents,
    }: {
        metrikaGoals?: MetrikaGoal;
        pixelEvents?: ButtonPixel;
    }) => {
        if (metrika && metrikaGoals) {
            if (isNewMetrikaFormat(metrikaGoals)) {
                metrikaGoals.forEach(({name, isCrossSite}) =>
                    metrika.reachGoal(isCrossSite ? 'cross-site' : 'main', name),
                );
            } else {
                metrika.reachGoals(metrikaGoals);
            }
        }

        if (pixel && pixelEvents) {
            pixelEvents.forEach(({name, data}) => pixel.trackStandard(name, data));
        }
    };
};
