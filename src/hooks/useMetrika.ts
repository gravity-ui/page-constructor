import {useContext} from 'react';
import {MetrikaContext} from '../context/metrikaContext';
import {ButtonPixel, MetrikaGoal, isNewMetrikaFormat, PixelEventType, PixelEvent} from '../models';

function isButtonPixel(
    pixelEvents: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel,
): pixelEvents is ButtonPixel {
    if (Array.isArray(pixelEvents) && pixelEvents.length && 'name' in pixelEvents) {
        return true;
    }

    return false;
}

type UseMetrikaProps = {
    metrikaGoals?: MetrikaGoal;
    pixelEvents?: string | string[] | PixelEvent | PixelEvent[] | ButtonPixel;
};

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
