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
        mobileHorizontalAlignment: copyright.mobileHorizontalAlignment || 'left',
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
    visibleItems: LinkItem[];
    isLinksOverflowDropdown: boolean;
};

const VisibleLinks = ({visibleItems, isLinksOverflowDropdown}: VisibleLinksProps) => {
    if (!visibleItems?.length) {
        return null;
    }

    return (
        <ul
            className={b('links-floor-list', {
                wrap: !isLinksOverflowDropdown,
            })}
        >
            {visibleItems.map((item, index) => (
                <li key={index} className={b('links-floor-item')}>
                    <a href={item.url}>{item.text}</a>
                </li>
            ))}
        </ul>
    );
};

type OverflowDropdownProps = {
    isLinksOverflowDropdown: boolean;
    hiddenItems: DropdownMenuItem[];
};

const OverflowDropdown = ({isLinksOverflowDropdown, hiddenItems}: OverflowDropdownProps) => {
    if (!isLinksOverflowDropdown || !hiddenItems.length) {
        return null;
    }

    return (
        <DropdownMenu
            items={hiddenItems}
            switcherWrapperClassName={b('more-button', {
                visible: isLinksOverflowDropdown && hiddenItems.length > 0,
            })}
            size="l"
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

export const CopyrightFloor = ({copyright}: CopyrightFloorProps) => {
    const theme = useTheme();
    const [isSmallWidth, setIsSmallWidth] = React.useState(false);
    const floorRef = React.useRef<HTMLDivElement>(null);

    const updateFloorSize = React.useCallback(() => {
        if (!floorRef.current) {
            return;
        }

        const floorWidth = floorRef.current.clientWidth;
        setIsSmallWidth(floorWidth <= MOBILE_WIDTH);
    }, []);

    useResizeObserver({ref: floorRef, onResize: updateFloorSize});

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
    const {shouldCenterLinks, mobileHorizontalAlignment} = useLinksAlignmentState(copyright);
    const copyrightLogoImage = copyright.logo && getThemedValue(copyright.logo.image, theme);
    const copyrightLogoImageProps = useLogoImageProps(copyrightLogoImage);

    return (
        <Col sizes={{all: 12}} className={b('floor', {copyright: true})} ref={floorRef}>
            <div className={b('links-floor-inner', {mobileHorizontalAlignment})}>
                <CopyrightLogo logo={copyright.logo} logoImageProps={copyrightLogoImageProps} />
                <div
                    className={b('links-floor-left', {
                        measured,
                        centered: shouldCenterLinks,
                    })}
                    ref={menuContainerRef}
                >
                    <VisibleLinks
                        visibleItems={visibleItems}
                        isLinksOverflowDropdown={isLinksOverflowDropdown}
                    />
                    <OverflowDropdown
                        isLinksOverflowDropdown={isLinksOverflowDropdown}
                        hiddenItems={hiddenItems}
                    />
                </div>
                <RightSide copyright={copyright} />
            </div>
        </Col>
    );
};
