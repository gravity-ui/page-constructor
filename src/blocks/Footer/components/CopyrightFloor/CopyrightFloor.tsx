import * as React from 'react';

import {DropdownMenu, DropdownMenuItem, Link, useResizeObserver} from '@gravity-ui/uikit';

import {Image} from '../../../../components';
import {useTheme} from '../../../../context/theme';
import {Col} from '../../../../grid';
import type {FooterBlockProps} from '../../../../models';
import {block, getThemedValue} from '../../../../utils';
import {useLogoImageProps} from '../../hooks/useLogoImageProps';
import {LinkItem, useOverflowListItems} from '../../hooks/useOverflowListItems';
import {LangSwitcher} from '../LangSwitcher';

import './CopyrightFloor.scss';

const b = block('footer-block');

const MOBILE_WIDTH = 768;

type CopyrightFloorProps = {
    copyright: NonNullable<FooterBlockProps['copyright']>;
};

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
        mobileHorizontalAlignment: copyright.logo
            ? copyright.mobileHorizontalAlignment || 'left'
            : 'left',
    };
}

type CopyrightLogoProps = {
    logo: CopyrightFloorProps['copyright']['logo'];
    logoImageProps: Record<string, unknown> | null;
};

const CopyrightLogo = ({logo, logoImageProps}: CopyrightLogoProps) => {
    if (!logo || !logoImageProps) {
        return null;
    }

    return (
        <div className={b('logo')}>
            {logo.href ? (
                <Link href={logo.href}>
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
            size="xl"
        />
    );
};

type RightSideProps = {
    copyright: CopyrightFloorProps['copyright'];
};

const RightSide = ({copyright}: RightSideProps) => {
    return (
        <div className={b('links-floor-right')}>
            {copyright.languageSwitcher && (
                <LangSwitcher
                    switcherText={copyright.languageSwitcher.buttonText}
                    items={copyright.languageSwitcher.items}
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
        if (typeof document === 'undefined') {
            return false;
        }

        return document.documentElement.clientWidth <= MOBILE_WIDTH;
    });

    const updateFloorSize = React.useCallback(() => {
        setIsSmallWidth(document.documentElement.clientWidth <= MOBILE_WIDTH);
    }, []);

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
        moreButtonWidth: 28,
    });
    const {shouldCenterLinks, threeColumnLayout, mobileHorizontalAlignment} =
        useLinksAlignmentState(copyright);
    const hasRightSideContent = Boolean(copyright.languageSwitcher || copyright.copyrightText);
    const copyrightLogoImage = copyright.logo && getThemedValue(copyright.logo.image, theme);
    const copyrightLogoImageProps = useLogoImageProps(copyrightLogoImage);

    const linksContent = (
        <div
            className={b('links-floor-left', {measured, centered: shouldCenterLinks})}
            ref={menuContainerRef}
        >
            <VisibleLinks items={visibleItems} isLinksOverflowDropdown={isLinksOverflowDropdown} />
            <OverflowDropdown
                isLinksOverflowDropdown={isLinksOverflowDropdown}
                items={hiddenItems}
            />
        </div>
    );

    return (
        <Col sizes={{all: 12}} className={b('floor', {copyright: true})}>
            <div
                className={b('links-floor-inner', {
                    mobileHorizontalAlignment,
                    centered: shouldCenterLinks,
                    threeColumn: threeColumnLayout,
                })}
            >
                <CopyrightLogo logo={copyright.logo} logoImageProps={copyrightLogoImageProps} />
                {threeColumnLayout ? (
                    <div className={b('links-floor-center')}>{linksContent}</div>
                ) : (
                    linksContent
                )}
                {hasRightSideContent && <RightSide copyright={copyright} />}
            </div>
        </Col>
    );
};
