import * as React from 'react';

import {DropdownMenu, DropdownMenuItem, Link, useResizeObserver} from '@gravity-ui/uikit';

import {Image} from '../../../../components';
import {BREAKPOINTS} from '../../../../constants';
import {useTheme} from '../../../../context/theme';
import {Col} from '../../../../grid';
import type {FooterBlockProps} from '../../../../models';
import {block, getThemedValue} from '../../../../utils';
import {useLogoImageProps} from '../../hooks/useLogoImageProps';
import {LinkItem, useOverflowListItems} from '../../hooks/useOverflowListItems';
import {LangSwitcher} from '../LangSwitcher';

import './CopyrightFloor.scss';

const b = block('footer-block');

const MOBILE_WIDTH = BREAKPOINTS.sm;
const THREE_COLUMN_DESKTOP_WIDTH = BREAKPOINTS.md;

type CopyrightFloorProps = {
    copyright: NonNullable<FooterBlockProps['copyright']>;
};

function getElementFlexContentWidth(element: HTMLElement) {
    const children = Array.from(element.children) as HTMLElement[];

    if (!children.length) {
        return element.scrollWidth;
    }

    const elementStyles = window.getComputedStyle(element);
    const columnGap = parseFloat(elementStyles.columnGap);
    const gap = Number.isNaN(columnGap) ? 0 : columnGap;
    // extra 1px to prevent overflow
    const childrenWidths = children.map((child) => child.scrollWidth + 1);

    if (elementStyles.flexDirection.startsWith('column')) {
        return Math.ceil(Math.max(...childrenWidths));
    }

    return Math.ceil(
        childrenWidths.reduce((sum, width) => sum + width, 0) + gap * (children.length - 1),
    );
}

function useLinksAlignmentState(copyright: CopyrightFloorProps['copyright']) {
    const hasOnlyLinks = Boolean(
        copyright.links?.length &&
            !copyright.logo &&
            !copyright.languageSwitcher &&
            !copyright.copyrightText,
    );
    const areLinksInTheMiddle = Boolean(
        copyright.logo &&
            copyright.links?.length &&
            (copyright.languageSwitcher || copyright.copyrightText),
    );

    return {
        shouldCenterLinks: areLinksInTheMiddle || hasOnlyLinks,
        threeColumnLayout: areLinksInTheMiddle,
        hasOnlyLinks,
    };
}

type CopyrightLogoProps = {
    logo: CopyrightFloorProps['copyright']['logo'];
    logoImageProps: Record<string, unknown> | null;
    logoRef?: React.RefObject<HTMLDivElement>;
};

const CopyrightLogo = ({logo, logoImageProps, logoRef}: CopyrightLogoProps) => {
    if (!logo || !logoImageProps) {
        return null;
    }

    return (
        <div className={b('logo')} ref={logoRef}>
            {logo.url ? (
                <Link href={logo.url}>
                    <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
                </Link>
            ) : (
                <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
            )}
        </div>
    );
};

type VisibleLinksProps = {
    items: LinkItem[];
    isLinksOverflowDropdown: boolean;
};

const VisibleLinks = ({items, isLinksOverflowDropdown}: VisibleLinksProps) => {
    if (!items?.length) {
        return null;
    }

    return (
        <ul
            className={b('links-floor-list', {
                wrap: !isLinksOverflowDropdown,
            })}
        >
            {items.map((item, index) => (
                <li key={index} className={b('links-floor-item')}>
                    <a href={item.url}>{item.text}</a>
                </li>
            ))}
        </ul>
    );
};

type OverflowDropdownProps = {
    isLinksOverflowDropdown: boolean;
    items: DropdownMenuItem[];
};

const OverflowDropdown = ({isLinksOverflowDropdown, items}: OverflowDropdownProps) => {
    if (!isLinksOverflowDropdown || !items.length) {
        return null;
    }

    return (
        <DropdownMenu
            items={items}
            switcherWrapperClassName={b('more-button', {
                visible: isLinksOverflowDropdown && items.length > 0,
            })}
            size="l"
        />
    );
};

type RightSideProps = {
    copyright: CopyrightFloorProps['copyright'];
    rightSideRef: React.RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
};

const RightSide = ({copyright, rightSideRef, style}: RightSideProps) => {
    const theme = useTheme();

    return (
        <div className={b('links-floor-right')} ref={rightSideRef} style={style}>
            {copyright.languageSwitcher && (
                <LangSwitcher
                    buttonText={copyright.languageSwitcher.buttonText}
                    items={copyright.languageSwitcher.items}
                    image={getThemedValue(copyright.languageSwitcher.image, theme)}
                />
            )}
            {copyright.copyrightText && (
                <span className={b('links-floor-copyright')}>{copyright.copyrightText}</span>
            )}
        </div>
    );
};

const DOCUMENT_ELEMENT_REF = {
    current: document.documentElement,
};

export const CopyrightFloor = ({copyright}: CopyrightFloorProps) => {
    const theme = useTheme();
    const [isSmallWidth, setIsSmallWidth] = React.useState(() => {
        return document.documentElement.clientWidth <= MOBILE_WIDTH;
    });
    const [isThreeColumnStacked, setIsThreeColumnStacked] = React.useState(() => {
        return document.documentElement.clientWidth <= THREE_COLUMN_DESKTOP_WIDTH;
    });
    const [sideColumnWidth, setSideColumnWidth] = React.useState<number>();
    const logoRef = React.useRef<HTMLDivElement>(null);
    const rightSideRef = React.useRef<HTMLDivElement>(null);

    const updateSideColumnWidth = React.useCallback(() => {
        const logoWidth = Math.ceil(logoRef.current?.getBoundingClientRect().width ?? 0);
        const rightSideWidth = rightSideRef.current
            ? getElementFlexContentWidth(rightSideRef.current)
            : 0;
        const maxSideWidth = Math.max(logoWidth, rightSideWidth);

        setSideColumnWidth(maxSideWidth || undefined);
    }, []);

    const updateFloorSize = React.useCallback(() => {
        setIsSmallWidth(document.documentElement.clientWidth <= MOBILE_WIDTH);
        setIsThreeColumnStacked(document.documentElement.clientWidth <= THREE_COLUMN_DESKTOP_WIDTH);
        updateSideColumnWidth();
    }, [updateSideColumnWidth]);

    useResizeObserver({
        ref: DOCUMENT_ELEMENT_REF,
        onResize: updateFloorSize,
    });

    const menuContainerRef = React.useRef<HTMLDivElement>(null);
    const linksOverflowStrategy = copyright.linksOverflowStrategy || 'dropdown';
    const isLinksOverflowDropdown = linksOverflowStrategy === 'dropdown';
    const {visibleItems, hiddenItems, measured} = useOverflowListItems({
        isDropdown: isLinksOverflowDropdown && !isSmallWidth,
        containerRef: menuContainerRef,
        items: copyright.links,
        itemSelector: `.${b('links-floor-item')}`,
        moreButtonWidth: 52,
    });
    const {shouldCenterLinks, threeColumnLayout, hasOnlyLinks} = useLinksAlignmentState(copyright);
    const hasLanguageSwitcher = Boolean(copyright.languageSwitcher);
    const hasCopyrightText = Boolean(copyright.copyrightText);
    const hasRightSideContent = hasLanguageSwitcher || hasCopyrightText;
    const copyrightLogoImage = copyright.logo && getThemedValue(copyright.logo.image, theme);
    const copyrightLogoImageProps = useLogoImageProps(copyrightLogoImage);

    React.useEffect(() => {
        if (isThreeColumnStacked) {
            updateSideColumnWidth();
        }
    }, [updateSideColumnWidth, copyrightLogoImageProps, hasRightSideContent, isThreeColumnStacked]);

    const linksContent = (
        <div className={b('links-floor-left', {measured})} ref={menuContainerRef}>
            <VisibleLinks items={visibleItems} isLinksOverflowDropdown={isLinksOverflowDropdown} />
            <OverflowDropdown
                isLinksOverflowDropdown={isLinksOverflowDropdown}
                items={hiddenItems}
            />
        </div>
    );

    const sideColumnStyle = React.useMemo<React.CSSProperties | undefined>(() => {
        if (!threeColumnLayout || isThreeColumnStacked || sideColumnWidth === undefined) {
            return undefined;
        }

        return {width: sideColumnWidth};
    }, [isThreeColumnStacked, sideColumnWidth, threeColumnLayout]);

    return (
        <Col sizes={{all: 12}} className={b('floor', {copyright: true})}>
            <div
                className={b('links-floor-inner', {
                    centered: shouldCenterLinks,
                    threeColumn: threeColumnLayout,
                    overflow: linksOverflowStrategy,
                    withLanguageSwitcher: hasLanguageSwitcher,
                    hasOnlyLinks,
                })}
            >
                {copyright.logo && (
                    <div className={b('links-floor-side')} style={sideColumnStyle}>
                        <CopyrightLogo
                            logo={copyright.logo}
                            logoImageProps={copyrightLogoImageProps}
                            logoRef={logoRef}
                        />
                    </div>
                )}
                {threeColumnLayout ? (
                    <div className={b('links-floor-center')}>{linksContent}</div>
                ) : (
                    linksContent
                )}
                {hasRightSideContent && (
                    <RightSide
                        copyright={copyright}
                        rightSideRef={rightSideRef}
                        style={sideColumnStyle}
                    />
                )}
            </div>
        </Col>
    );
};
