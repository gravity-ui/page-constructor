import * as React from 'react';

import {DropdownMenuItem, useResizeObserver} from '@gravity-ui/uikit';
import debounceFn from 'lodash/debounce';

type LinkItem = {
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

export function useOverflowListItems({
    isDropdown = false,
    containerRef,
    items,
    itemSelector,
    moreButtonWidth = 0,
}: UseOverflowListItemsProps): OverflowListItemsResult {
    const [containerWidth, setContainerWidth] = React.useState<number>(0);
    const [itemWidths, setItemWidths] = React.useState<number[]>([]);

    React.useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const measureItemSizes = () => {
            const itemElements = Array.from(
                containerRef.current?.querySelectorAll(itemSelector) ?? [],
            ) as HTMLElement[];
            setItemWidths(itemElements.map((item) => item.clientWidth));
        };

        measureItemSizes();
    }, [containerRef, itemSelector]);

    const updateContainerSize = React.useMemo(
        () =>
            debounceFn(() => {
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
            remainingContainerWidth -= width;
            if (remainingContainerWidth < moreButtonWidth) {
                const isMoreThanOneItemLeft = itemsCount !== visibleItemsCount + 1;
                const hasNoSpaceForTheLastItem = remainingContainerWidth < 0;
                if (isMoreThanOneItemLeft || hasNoSpaceForTheLastItem) {
                    break;
                }
            }

            visibleItemsCount++;
        }

        visibleItemsCount = Math.max(visibleItemsCount, 2);
        return {
            visibleItems: items?.slice(0, visibleItemsCount) ?? [],
            hiddenItems: transformItemsToDropdownMenuItems(items?.slice(visibleItemsCount) ?? []),
        };
    }, [containerWidth, isMeasured, itemWidths, items, moreButtonWidth, isDropdown]);

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
