import {useContext} from 'react';
import {MetrikaContext} from '../context/metrikaContext';
import {ButtonPixel, MetrikaGoal, PixelEventType, PixelEvent, GAEvent, GAEvents} from '../models';
import {isNewMetrikaFormat} from '../models/guards';

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
    gaEvents?: GAEvents;
};

export const useMetrika = () => {
    const {metrika, pixel, ga} = useContext(MetrikaContext);

    return ({metrikaGoals, pixelEvents, gaEvents}: UseMetrikaProps) => {
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

        if (ga && gaEvents) {
            const gaEventsArray = Array.isArray(gaEvents) ? gaEvents : [gaEvents];
            gaEventsArray.forEach(({eventName, ...rest}: GAEvent) => {
                ga.event(eventName, rest);
            });
        }
    };
};
