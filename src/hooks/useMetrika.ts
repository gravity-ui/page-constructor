import {useContext} from 'react';

import {MetrikaContext} from '../context/metrikaContext';
import {ButtonPixel, MetrikaGoal, PixelEvent, PixelEventType} from '../models';
import {isNewMetrikaFormat} from '../models/guards';

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated Metrika will be deleted, which uses this logic
 */
function isButtonPixel(
    pixelEvents: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel,
): pixelEvents is ButtonPixel {
    if (Array.isArray(pixelEvents) && pixelEvents.length && 'name' in pixelEvents) {
        return true;
    }

    return false;
}

/**
 * @deprecated Metrika will be deleted
 */
type UseMetrikaProps = {
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated useMetrika will be deleted
 */
export const useMetrika = () => {
    const {metrika, pixel} = useContext(MetrikaContext);

    return ({metrikaGoals, pixelEvents}: UseMetrikaProps) => {
        if (metrika && metrikaGoals) {
            if (isNewMetrikaFormat(metrikaGoals)) {
                metrikaGoals.forEach(({name, isCrossSite}) =>
                    metrika.reachGoal(isCrossSite ? 'cross-site' : 'main', name),
                );
            } else {
                metrika.reachGoals(metrikaGoals);
            }

            if (!pixelEvents && pixel) {
                pixel.trackStandard(PixelEventType.SubmitApplication, {
                    content_category: 'custom',
                    content_ids: Array.isArray(metrikaGoals) ? metrikaGoals : [metrikaGoals],
                });
            }
        }

        if (pixel && pixelEvents) {
            if (isButtonPixel(pixelEvents)) {
                pixelEvents.forEach(({name, data}) => pixel.trackStandard(name, data));
            } else {
                pixel.track(pixelEvents);
            }
        }
    };
};
