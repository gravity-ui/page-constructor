import block from 'bem-cn-lite';
import React, {useCallback, useContext, useEffect, useState} from 'react';

import {BreakpointContext} from '../../context/breakpointContext';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import MediaContent from './MediaContent/MediaContent';
import {useIntersection} from '../../hooks/useIntersection';
import {Row} from '../../grid';
import {PreviewBlockProps} from '../../models';
import {BREAKPOINTS} from '../../constants';
import {doSmoothScroll, ScrollOptions} from '../../utils';

import './Preview.scss';

const b = block('preview-block');

interface ChangeActiveSlideParams {
    current: HTMLDivElement | null;
    nextSlide: number;
    currentSlide: number;
    timerId: number;
}

const SWITCHING_INTERVAL = 5 * 1000;
const WIDTH_MENU_ITEM_MD_SIZE = 275;
const INDENT_MENU_ITEM_MD_SIZE = 16;
const SCROLL_ITEM_SECONDS = 1;
const SCROLL_ITEM_SPEED = 2;
const CLASSNAME_DESCRIPTION_YFM_BLOCK = 'yfm';
const CLASSNAME_CONTENT_WRAPPER = 'preview-media-content-block__content-wrapper';
const INDENT_BETWEEN_TITLE_DESCRIPTION = 16;

const PreviewBlock: React.FC<PreviewBlockProps> = (props) => {
    const {
        direction = 'content-media',
        animated,
        items,
        title,
        description,
        ratioMediaContent = '1-1',
    } = props;

    const breakpoint = useContext(BreakpointContext);
    const isDesktop = breakpoint >= BREAKPOINTS.md;

    const menuRef = React.useRef<HTMLDivElement>(null);
    const previewRef = React.useRef<HTMLDivElement>(null);

    const inViewport = useIntersection(previewRef.current as Element);

    const [stopSwitching, setStopSwitching] = useState<boolean>(false);
    const [activeSlide, setActiveSlide] = useState<number>(-1);
    const [autoSwitchTimerId, setAutoSwitchTimerId] = useState<number>(0);

    const isActiveBlock = useCallback(
        (id: number, isMediaBlock = false) => {
            return isMediaBlock || inViewport ? activeSlide === id : false;
        },
        [inViewport, activeSlide],
    );

    const changeActiveSlide = useCallback(
        (params: ChangeActiveSlideParams) => {
            const {current, nextSlide, currentSlide, timerId} = params;

            if (isDesktop) {
                changeDescriptionHeight(current, nextSlide, currentSlide);
            } else {
                changeMenuScroll(current, nextSlide, currentSlide);
            }

            setActiveSlide(nextSlide);
            clearTimeout(timerId);
        },
        [isDesktop],
    );

    useEffect(() => {
        if (inViewport && !items[activeSlide]) {
            setActiveSlide(0);

            if (isDesktop) {
                changeDescriptionHeight(menuRef.current, 0);
            }
        }
    }, [inViewport, activeSlide, isDesktop, items]);

    useEffect(() => {
        if (stopSwitching || !inViewport) {
            return () => {};
        }

        const timerId = setTimeout(() => {
            if (stopSwitching) {
                clearTimeout(timerId);
                return;
            }

            const nextSlide = activeSlide + 1 >= items.length ? 0 : activeSlide + 1;

            changeActiveSlide({
                current: menuRef.current,
                nextSlide,
                currentSlide: activeSlide,
                timerId: (timerId as unknown) as number,
            });
        }, SWITCHING_INTERVAL);
        setAutoSwitchTimerId((timerId as unknown) as number);

        return () => clearTimeout(timerId);
    }, [changeActiveSlide, activeSlide, items.length, stopSwitching, inViewport]);

    const showMediaContent = useCallback(
        (nextSlide: number) => {
            changeActiveSlide({
                current: menuRef.current,
                nextSlide,
                currentSlide: activeSlide,
                timerId: autoSwitchTimerId,
            });
            setStopSwitching(true);
        },
        [changeActiveSlide, activeSlide, autoSwitchTimerId],
    );

    return (
        <AnimateBlock className={b()} animate={animated}>
            <Row ref={previewRef} className={b('row', {reverse: direction === 'media-content'})}>
                <MediaContent
                    ref={menuRef}
                    items={items}
                    title={title}
                    description={description}
                    ratioMediaContent={ratioMediaContent}
                    switching={!stopSwitching}
                    isActiveBlock={isActiveBlock}
                    showMediaContent={showMediaContent}
                />
            </Row>
        </AnimateBlock>
    );
};

function changeMenuScroll(
    element: HTMLDivElement | null,
    nextSlide: number,
    activeSlide: number,
): void {
    if (!element) {
        return;
    }

    const scrollPosition = element.scrollLeft;
    const endPosition =
        nextSlide === 0 ? 0 : nextSlide * WIDTH_MENU_ITEM_MD_SIZE + INDENT_MENU_ITEM_MD_SIZE;

    const distance = Math.abs(scrollPosition - endPosition);
    const isReverse = nextSlide === 0 || nextSlide < activeSlide;

    const scrollOptions: ScrollOptions = {
        distance,
        timeSeconds: SCROLL_ITEM_SECONDS,
        speed: SCROLL_ITEM_SPEED,
        reverseParams: isReverse ? {distance} : undefined,
    };

    doSmoothScroll(element, scrollPosition, scrollOptions);
}

function changeDescriptionHeight(
    element: HTMLDivElement | null,
    nextActiveSlide: number,
    prevActiveSlide = 0,
): void {
    const contentWrapper = element?.getElementsByClassName(CLASSNAME_CONTENT_WRAPPER);

    if (!contentWrapper || contentWrapper.length === 0) {
        return;
    }

    const menuItems = contentWrapper[0].children;

    updateHeight(menuItems, nextActiveSlide);

    if (nextActiveSlide !== prevActiveSlide) {
        updateHeight(menuItems, prevActiveSlide, false);
    }
}

function updateHeight(menuItems: HTMLCollection, slide: number, isExpand = true): void {
    const item = menuItems[slide];
    const yfmBlock = item.getElementsByClassName(CLASSNAME_DESCRIPTION_YFM_BLOCK)[0];

    if (yfmBlock) {
        const yfmBlockElement = yfmBlock as HTMLElement;
        const yfmBlockHeight = yfmBlockElement.offsetHeight;
        const yfmBlockOffsetParent = yfmBlockElement.offsetParent as HTMLElement;

        yfmBlockOffsetParent.style.height = isExpand
            ? `${yfmBlockHeight + INDENT_BETWEEN_TITLE_DESCRIPTION}px`
            : '0px';
    }
}

export default PreviewBlock;
