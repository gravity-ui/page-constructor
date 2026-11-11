import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import {Image, Title} from '../../components';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {useTheme} from '../../context/theme';
import {block, getQaAttrubutes, getThemedValue} from '../../utils';

import {
    DEFAULT_COLUMN_GAP,
    DEFAULT_COLUMN_SIZE,
    DEFAULT_DURATION,
    DEFAULT_ITEM_HEIGHT,
    DEFAULT_ROW_GAP,
    FOCUSABLE_SELECTOR,
} from './constants';
import {StripBlockProps, StripItemStyle, StripStyle} from './types';
import {getImageItems, getImageMaskStyle} from './utils';

import './Strip.scss';

export type {StripBlockProps} from './types';

const b = block('strip-block');

export const StripBlock = ({
    title,
    description,
    images,
    color,
    layout = 'wrap',
    colSizes,
    itemHeight = DEFAULT_ITEM_HEIGHT,
    rowGap = DEFAULT_ROW_GAP,
    columnGap = DEFAULT_COLUMN_GAP,
    pauseOnHover = true,
    duration = DEFAULT_DURATION,
    animated,
    qa,
    children,
}: StripBlockProps) => {
    const theme = useTheme();
    const viewportRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement | null>(null);
    const [isMarqueeActive, setIsMarqueeActive] = React.useState(false);
    const [viewportWidth, setViewportWidth] = React.useState(0);
    const qaAttributes = getQaAttrubutes(
        qa,
        'viewport',
        'track',
        'list',
        'duplicate-list',
        'image',
        'colorized-image',
    );
    const imageItems = getImageItems(images).map(({image, url, urlTitle, target}, index) => {
        const themedImage = getThemedValue(image, theme);
        const imageElement = (
            <Image
                {...themedImage}
                className={b('image')}
                containerClassName={b('image-container')}
                qa={qaAttributes.image ? `${qaAttributes.image}-${index}` : undefined}
            />
        );
        const renderedImage =
            color === 'text-color' ? (
                <span
                    className={b('colorized-image')}
                    style={getImageMaskStyle(themedImage)}
                    data-qa={
                        qaAttributes.colorizedImage
                            ? `${qaAttributes.colorizedImage}-${index}`
                            : undefined
                    }
                >
                    {imageElement}
                </span>
            ) : (
                imageElement
            );

        return url ? (
            <Link
                key={index}
                href={url}
                target={target}
                rel={target === '_blank' ? 'noopener noreferrer' : undefined}
                title={urlTitle}
                className={b('image-link')}
            >
                {renderedImage}
            </Link>
        ) : (
            <React.Fragment key={index}>{renderedImage}</React.Fragment>
        );
    });
    const content = imageItems?.length ? imageItems : children;

    const updateMarqueeState = React.useCallback(() => {
        if (layout !== 'marquee') {
            setIsMarqueeActive(false);

            return;
        }

        const viewport = viewportRef.current;
        const list = listRef.current;

        if (!viewport || !list) {
            return;
        }

        setViewportWidth((currentValue) =>
            currentValue === viewport.clientWidth ? currentValue : viewport.clientWidth,
        );

        const shouldAnimate = Math.ceil(list.scrollWidth) > Math.floor(viewport.clientWidth);

        setIsMarqueeActive((currentValue) =>
            currentValue === shouldAnimate ? currentValue : shouldAnimate,
        );
    }, [layout]);

    React.useEffect(() => {
        updateMarqueeState();

        const viewport = viewportRef.current;
        const list = listRef.current;

        if (!viewport || !list) {
            return undefined;
        }

        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(updateMarqueeState);

            resizeObserver.observe(viewport);
            resizeObserver.observe(list);

            return () => resizeObserver.disconnect();
        }

        window.addEventListener('resize', updateMarqueeState);

        return () => window.removeEventListener('resize', updateMarqueeState);
    }, [children, columnGap, images, theme, viewportWidth, updateMarqueeState]);

    if (!React.Children.count(content)) {
        return null;
    }

    const style: StripStyle = {
        '--pc-strip-row-gap': `${rowGap}px`,
        '--pc-strip-column-gap': `${columnGap}px`,
        '--pc-strip-duration': `${duration}s`,
        '--pc-strip-viewport-width': `${viewportWidth}px`,
        '--pc-strip-item-height': typeof itemHeight === 'number' ? `${itemHeight}px` : itemHeight,
    };

    const allColumnSize = colSizes?.all ?? DEFAULT_COLUMN_SIZE;
    const smColumnSize = colSizes?.sm ?? allColumnSize;
    const mdColumnSize = colSizes?.md ?? smColumnSize;
    const lgColumnSize = colSizes?.lg ?? mdColumnSize;
    const xlColumnSize = colSizes?.xl ?? lgColumnSize;
    const itemStyle: StripItemStyle | undefined = colSizes
        ? {
              '--pc-strip-col-size-all': allColumnSize,
              '--pc-strip-col-size-sm': smColumnSize,
              '--pc-strip-col-size-md': mdColumnSize,
              '--pc-strip-col-size-lg': lgColumnSize,
              '--pc-strip-col-size-xl': xlColumnSize,
          }
        : undefined;
    const hasMeasuredColumnSizes = Boolean(colSizes) && (layout === 'wrap' || viewportWidth > 0);

    const renderItemList = (duplicate = false) => (
        <div
            className={b('list', {duplicate})}
            role="list"
            aria-hidden={duplicate || undefined}
            ref={(element) => {
                if (duplicate) {
                    element
                        ?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
                        .forEach((interactiveElement) => {
                            interactiveElement.setAttribute('tabindex', '-1');
                        });
                } else {
                    listRef.current = element;
                }
            }}
            data-qa={duplicate ? qaAttributes.duplicateList : qaAttributes.list}
        >
            {React.Children.map(content, (child, index) => (
                <div className={b('item')} style={itemStyle} role="listitem" key={index}>
                    {child}
                </div>
            ))}
        </div>
    );

    return (
        <AnimateBlock
            className={b({
                layout,
                'with-col-sizes': hasMeasuredColumnSizes,
                'marquee-active': isMarqueeActive,
                'pause-on-hover': isMarqueeActive && pauseOnHover,
            })}
            style={style}
            animate={animated}
            qa={qa}
        >
            {(title || description) && (
                <Title
                    className={b('header')}
                    title={
                        title
                            ? {
                                  text: title,
                                  textSize: 'm',
                                  justify: 'center',
                              }
                            : undefined
                    }
                    subtitle={description}
                    colSizes={{all: 12, sm: 8}}
                />
            )}
            <div className={b('content')}>
                {layout === 'marquee' ? (
                    <div
                        className={b('viewport')}
                        ref={viewportRef}
                        data-qa={qaAttributes.viewport}
                    >
                        <div className={b('track')} data-qa={qaAttributes.track}>
                            {renderItemList()}
                            {isMarqueeActive && renderItemList(true)}
                        </div>
                    </div>
                ) : (
                    renderItemList()
                )}
            </div>
        </AnimateBlock>
    );
};

export default StripBlock;
