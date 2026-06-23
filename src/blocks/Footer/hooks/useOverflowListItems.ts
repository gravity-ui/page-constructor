import * as React from 'react';

import {DropdownMenuItem, useResizeObserver} from '@gravity-ui/uikit';
import throttleFn from 'lodash/throttle';

export type LinkItem = {
    text: string;
    url: string;
};

type UseOverflowListItemsProps = {
    isDropdown?: boolean;
    containerRef: React.RefObject<HTMLElement>;
    items?: LinkItem[];
    itemSelector: string;
    moreButtonWidth?: number;
};

type OverflowListItemsResult = {
    visibleItems: LinkItem[];
    hiddenItems: DropdownMenuItem[];
    measured: boolean;
};

function parseCssPixelValue(value: string) {
    const parsedValue = parseFloat(value);

    return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

export function useOverflowListItems({
    isDropdown = false,
    containerRef,
    items,
    itemSelector,
    moreButtonWidth = 0,
}: UseOverflowListItemsProps): OverflowListItemsResult {
    const [containerWidth, setContainerWidth] = React.useState<number>(0);
    const [itemWidths, setItemWidths] = React.useState<number[]>([]);
    const [itemGap, setItemGap] = React.useState<number>(0);

    React.useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const itemElements = Array.from(
            containerRef.current?.querySelectorAll(itemSelector) ?? [],
        ) as HTMLElement[];
        const listElement = itemElements[0]?.parentElement;

        setItemWidths(itemElements.map((item) => item.clientWidth));

        if (listElement) {
            const listStyles = window.getComputedStyle(listElement);
            setItemGap(parseCssPixelValue(listStyles.columnGap));
        }
    }, [containerRef, itemSelector, items]);

    const updateContainerSize = React.useMemo(
        () =>
            throttleFn(() => {
                if (!containerRef.current) {
                    return;
                }

                setContainerWidth(containerRef.current.clientWidth);
            }, 100),
        [containerRef],
    );

    useResizeObserver({ref: containerRef, onResize: updateContainerSize});

    const isMeasured = containerWidth > 0;

    const {visibleItems, hiddenItems} = React.useMemo(() => {
        if (!isDropdown) {
            return {
                visibleItems: items ?? [],
                hiddenItems: [],
            };
        }

        if (!isMeasured) {
            return {
                visibleItems: items ?? [],
                hiddenItems: [],
            };
        }

        const itemsCount = itemWidths.length;
        let visibleItemsCount = 0;
        let remainingContainerWidth = containerWidth;

        for (const width of itemWidths) {
            const isMoreThanOneItemLeft = itemsCount !== visibleItemsCount + 1;
            const currentItemWidth = width + (visibleItemsCount === 0 ? 0 : itemGap);

            remainingContainerWidth -= currentItemWidth;

            const hasNoSpaceForTheLastItem = remainingContainerWidth < 0;
            if (
                remainingContainerWidth < moreButtonWidth &&
                (isMoreThanOneItemLeft || hasNoSpaceForTheLastItem)
            ) {
                break;
            }

            visibleItemsCount++;
        }

        visibleItemsCount = Math.max(visibleItemsCount, 1);

        return {
            visibleItems: items?.slice(0, visibleItemsCount) ?? [],
            hiddenItems: transformItemsToDropdownMenuItems(items?.slice(visibleItemsCount) ?? []),
        };
    }, [containerWidth, isMeasured, itemGap, itemWidths, items, moreButtonWidth, isDropdown]);

    return {visibleItems, hiddenItems, measured: isMeasured};
}

function transformItemsToDropdownMenuItems<ItemType extends {text: string; url: string}>(
    items: ItemType[],
): DropdownMenuItem[] {
    return items.map((item) => ({
        text: item.text,
        href: item.url,
    }));
}
