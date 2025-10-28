import {Coordinate, YMapMargin} from '../../../models';

export type ParsedMargin = [top: number, right: number, bottom: number, left: number];

export const parseMargin = (margin: YMapMargin): ParsedMargin => {
    if (!Array.isArray(margin)) {
        return [margin, margin, margin, margin];
    }

    if (margin.length === 2) {
        return [margin[0], margin[1], margin[0], margin[1]];
    }

    return margin;
};

export const calcPixelBounds = (
    [leftTop, rightBottom]: [Coordinate, Coordinate],
    zoom: number,
    containerSize: Coordinate,
) => {
    const utils = window.ymaps.util.bounds;

    let [[leftPx, topPx], [rightPx, bottomPx]] = utils.toGlobalPixelBounds(
        [leftTop, rightBottom],
        zoom,
    ) as [Coordinate, Coordinate];

    // fall back to container size in case there is only one marker and area is 0
    if (rightPx - leftPx <= 0) {
        const halfX = containerSize[0] / 2;
        leftPx -= halfX;
        rightPx += halfX;
    }

    if (bottomPx - topPx <= 0) {
        const halfY = containerSize[1] / 2;
        topPx -= halfY;
        bottomPx += halfY;
    }

    return [
        [leftPx, topPx],
        [rightPx, bottomPx],
    ];
};

const calcNewZoom = (l: number, zoom: number, marginSum: number) => {
    return Math.log2((Math.pow(2, zoom) * (l - marginSum)) / l);
};

export const calculateMapParamsWithMarginAndZoom = (
    [leftTop, rightBottom]: [Coordinate, Coordinate],
    zoom: number,
    areaMargin: ParsedMargin,
    containerSize: Coordinate,
) => {
    const utils = window.ymaps.util.bounds;

    // calculate pixel bounds with current zoom
    let [[leftPx, topPx], [rightPx, bottomPx]] = calcPixelBounds(
        [leftTop, rightBottom],
        zoom,
        containerSize,
    );

    const [topMargin, rightMargin, bottomMargin, leftMargin] = areaMargin;

    let zoomV: number;
    let zoomH: number;

    // calculate new zoom value after margins are applied
    if (leftMargin && rightMargin) {
        zoomH = calcNewZoom(rightPx - leftPx, zoom, leftMargin + rightMargin);
    } else {
        zoomH = zoom;
    }

    if (topMargin && bottomMargin) {
        zoomV = calcNewZoom(bottomPx - topPx, zoom, topMargin + bottomMargin);
    } else {
        zoomV = zoom;
    }

    const newZoom = Math.min(zoomV, zoomH);

    // calculate pixel bounds with new zoom
    [[leftPx, topPx], [rightPx, bottomPx]] = calcPixelBounds(
        [leftTop, rightBottom],
        newZoom,
        containerSize,
    );

    // calculate new bounds (scale if both size are present, otherwise shift the map)
    if (leftMargin && rightMargin) {
        leftPx -= leftMargin;
        rightPx += rightMargin;
    } else if (leftMargin) {
        leftPx -= leftMargin;
        rightPx -= leftMargin;
    } else if (rightMargin) {
        leftPx += rightMargin;
        rightPx += rightMargin;
    }

    if (topMargin && bottomMargin) {
        topPx -= topMargin;
        bottomPx += bottomMargin;
    } else if (topMargin) {
        topPx -= topMargin;
        bottomPx -= topMargin;
    } else if (bottomMargin) {
        topPx += bottomMargin;
        bottomPx += bottomMargin;
    }

    // transform new bounds into coordinates
    const [newLeftTop, newRightBottom] = utils.fromGlobalPixelBounds(
        [
            [leftPx, topPx],
            [rightPx, bottomPx],
        ],
        newZoom,
    );

    return {
        center: utils.getCenter([newLeftTop, newRightBottom]),
        zoom: newZoom,
    };
};
