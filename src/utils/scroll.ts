export enum ScrollDirection {
    HORIZONTAL = 'scrollLeft',
    VERTICAL = 'scrollTop',
}

export interface ScrollReverseParams {
    distance?: number;
}

export interface ScrollOptions {
    distance: number;
    timeSeconds: number;
    speed: number;
    direction?: ScrollDirection;
    reverseParams?: ScrollReverseParams;
}

type ChangeScrollFunction = (
    element: HTMLDivElement,
    scrollPosition: number,
    startPosition: number,
) => void;

export function doSmoothScroll(
    element: HTMLDivElement,
    startPosition: number,
    scrollOptions: ScrollOptions,
): void {
    const {
        distance,
        timeSeconds,
        speed,
        direction = ScrollDirection.HORIZONTAL,
        reverseParams,
    } = scrollOptions;
    let scrollShift = 0;
    let currentTimeChanges = 0;

    const changeScrollFunction = getChangeScrollFunction(direction, Boolean(reverseParams));
    const scrollDistance = reverseParams?.distance || distance;
    const timeChanges = getTimeChanges(scrollDistance, timeSeconds, speed);

    while (scrollShift < scrollDistance) {
        window.setTimeout(
            changeScrollFunction,
            currentTimeChanges,
            element,
            scrollShift,
            startPosition,
        );
        currentTimeChanges += timeChanges;
        scrollShift++;
    }
}

function getChangeScrollFunction(
    direction: ScrollDirection,
    isReverse: boolean,
): ChangeScrollFunction {
    return (element: HTMLDivElement, scrollPosition: number, startPosition: number) => {
        // eslint-disable-next-line no-not-accumulator-reassign/no-not-accumulator-reassign
        element[direction] = isReverse
            ? startPosition - scrollPosition
            : startPosition + scrollPosition;
    };
}

function getTimeChanges(distance: number, timeSeconds: number, acceleration: number): number {
    const physicalSpeed = distance / timeSeconds;
    const programSpeedMilliseconds = (1 / physicalSpeed) * 1000;

    return programSpeedMilliseconds / acceleration;
}
