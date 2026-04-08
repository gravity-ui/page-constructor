import * as React from 'react';

import {DropdownMenu, Flex, Link, Menu, MenuItem, Text} from '@gravity-ui/uikit';

import {BrandFooter, Image, YFMWrapper} from '../../components';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useTheme} from '../../context/theme';
import type {GridColumnSizesType} from '../../grid';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, FooterBlockProps} from '../../models';
import type {ImageProps as ModelImageProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import {LangSwitcher} from './components/LangSwitcher';
import {useOverflowListItems} from './hooks/useOverflowListItems';

import './Footer.scss';

const b = block('footer-block');

type FooterColumnSettings = {
    colSizes?: GridColumnSizesType;
};

export type FooterBlockFullProps = FooterBlockProps & FooterColumnSettings & ClassNameProps;

function getLogoImageProps(logoImage: ModelImageProps): Record<string, unknown> | null {
    const resolved = getMediaImage(logoImage);
    if (typeof resolved === 'string') {
        return {src: resolved};
    }
    return resolved && typeof resolved === 'object' ? (resolved as Record<string, unknown>) : null;
}

const DEFAULT_COL_SIZES_WITH_LOGO: GridColumnSizesType = {all: 6, sm: 3, md: 3, lg: 3};
const DEFAULT_COL_SIZES_WITHOUT_LOGO: GridColumnSizesType = {all: 6, sm: 4, md: 3, lg: 0};

function renderColumns(
    columns: FooterBlockProps['columns'],
    hasLogo: boolean,
    sectionIndex: number,
    colSizes?: GridColumnSizesType,
) {
    const defaultColSizes: GridColumnSizesType = hasLogo
        ? DEFAULT_COL_SIZES_WITH_LOGO
        : DEFAULT_COL_SIZES_WITHOUT_LOGO;
    const resolvedColSizes: GridColumnSizesType = {
        all: colSizes?.all ?? defaultColSizes.all,
        sm: colSizes?.sm ?? defaultColSizes.sm,
        md: colSizes?.md ?? defaultColSizes.md,
        lg: colSizes?.lg ?? defaultColSizes.lg,
    };

    return (
        <Col>
            <Row className={b('nav-row')}>
                {columns.map((column, columnIndex) => (
                    <Col
                        key={`${sectionIndex}-${columnIndex}`}
                        className={b('column')}
                        sizes={resolvedColSizes}
                    >
                        <div className={b('column-inner')}>
                            <h6 className={b('column-title')}>{column.title}</h6>
                            <ul className={b('links')}>
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className={b('link-item')}>
                                        <Link
                                            href={link.url}
                                            className={b('link')}
                                            title={link.urlTitle}
                                            target={link.target}
                                        >
                                            {link.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

function renderSocialIcons(
    contactsProps: NonNullable<FooterBlockProps['contacts']>,
    theme: ReturnType<typeof useTheme>,
) {
    const links = contactsProps.links;

    if (!links?.length) return null;

    return (
        <ul className={b('social-icons-list')}>
            {links.map((contact, index) => {
                const iconResolved = contact.icon && getThemedValue(contact.icon, theme);
                const iconProps = iconResolved && getLogoImageProps(iconResolved);

                if (!iconProps) return null;

                return (
                    <li key={index} className={b('social-icons-item')}>
                        <Link
                            className={b('social-icon-link')}
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Flex direction="column" alignItems="center" gap={2}>
                                <Image
                                    {...iconProps}
                                    alt={contact.urlTitle ?? ''}
                                    className={b('social-icon-item')}
                                />
                                {contact.urlTitle && (
                                    <Text variant="body-2">{contact.urlTitle}</Text>
                                )}
                            </Flex>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

// eslint-disable-next-line complexity
export const FooterBlock = (props: React.PropsWithChildren<FooterBlockFullProps>) => {
    const {
        logo,
        columns,
        colSizes,
        contacts,
        disclaimer,
        copyright,
        attribution,
        backgroundColor,
        className,
    } = props;
    const theme = useTheme();
    const themedBackground = backgroundColor && getThemedValue(backgroundColor, theme);
    const logoImage = logo?.image && getThemedValue(logo.image, theme);
    const logoImageProps = logoImage ? getLogoImageProps(logoImage) : null;
    const hasLogo = Boolean(logo && logoImageProps);

    const logoContent = logo && logoImageProps && (
        <div className={b('logo')}>
            {logo.href ? (
                <Link href={logo.href}>
                    <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
                </Link>
            ) : (
                <div className={b('logo-wrapper')}>
                    <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
                </div>
            )}
        </div>
    );

    const menuContainerRef = React.useRef<HTMLDivElement>(null);
    const isCopyrightLinksOverflowDropdown = copyright?.linksOverflowStrategy === 'dropdown';
    const {visibleItems, hiddenItems, measured} = useOverflowListItems({
        isDropdown: isCopyrightLinksOverflowDropdown,
        containerRef: menuContainerRef,
        items: copyright?.links,
        itemSelector: `.${b('links-floor-item')}`,
        moreButtonWidth: 28,
    });
    const shouldCenterLinks = Boolean(
        copyright?.logo &&
            copyright?.linksOverflowStrategy === 'line-wrap' &&
            (copyright?.languageSwitcher || copyright?.copyrightText),
    );

    return (
        <footer
            className={b(null, className)}
            style={themedBackground ? {backgroundColor: themedBackground} : undefined}
        >
            <Grid className={b('main-container')}>
                <Row className={b('row')}>
                    <Row className={b('floor', {navigation: true})}>
                        {/* First row: logo + columns */}
                        {hasLogo && (
                            <Col className={b('logo-col')} sizes={{all: 12, md: 4}}>
                                <Row>{logoContent}</Row>
                            </Col>
                        )}
                        {renderColumns(columns, hasLogo, 0, colSizes)}
                    </Row>
                    {/* Floor 2: Social row (Join Us + icons) */}
                    {contacts && contacts.links.length > 0 && (
                        <Col sizes={{all: 12}} className={b('floor', {social: true})}>
                            <div
                                className={b('social-floor-inner', {
                                    'title-position': contacts.titlePosition || 'top',
                                    'links-position': contacts.linksPosition || 'left',
                                    size: contacts.iconsSize ?? 'l',
                                })}
                            >
                                {contacts.title && (
                                    <h3 className={b('social-floor-title')}>{contacts.title}</h3>
                                )}
                                {renderSocialIcons(contacts, theme)}
                            </div>
                        </Col>
                    )}
                    {/* Floor 3: Legal disclaimer */}
                    {disclaimer && (
                        <Col sizes={{all: 12}} className={b('floor', {disclaimer: true})}>
                            <div className={b('disclaimer-floor-content')}>
                                <YFMWrapper
                                    content={disclaimer}
                                    modifiers={{
                                        constructor: true,
                                        'constructor-notice': true,
                                    }}
                                />
                            </div>
                        </Col>
                    )}
                    {/* Floor 4: Links + language + copyright */}
                    {copyright && (
                        <Col sizes={{all: 12}} className={b('floor', {copyright: true})}>
                            <div className={b('links-floor-inner')}>
                                {copyright.logo && (
                                    <div className={b('logo')}>
                                        <Link href={copyright.logo.href}>
                                            <Image
                                                {...getLogoImageProps(
                                                    getThemedValue(copyright.logo.image, theme),
                                                )}
                                                alt={copyright.logo.alt ?? ''}
                                                className={b('logo-image')}
                                            />
                                        </Link>
                                    </div>
                                )}
                                <div
                                    className={b('links-floor-left', {measured})}
                                    ref={menuContainerRef}
                                >
                                    {visibleItems.length > 0 && (
                                        <Menu
                                            className={b('links-floor-list', {
                                                wrap: !isCopyrightLinksOverflowDropdown,
                                                centered: shouldCenterLinks,
                                            })}
                                        >
                                            {visibleItems.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    href={item.url}
                                                    className={b('links-floor-item')}
                                                >
                                                    {item.text}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    )}
                                    {isCopyrightLinksOverflowDropdown && hiddenItems.length > 0 && (
                                        <DropdownMenu
                                            items={hiddenItems}
                                            switcherWrapperClassName={b('more-button')}
                                            size="l"
                                        />
                                    )}
                                </div>
                                <div className={b('links-floor-right')}>
                                    {copyright.languageSwitcher && (
                                        <LangSwitcher items={copyright.languageSwitcher} />
                                    )}
                                    {copyright.copyrightText && (
                                        <span className={b('links-floor-copyright')}>
                                            {copyright.copyrightText}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Col>
                    )}
                    {/* Floor 5: Attribution */}
                    {attribution && (
                        <Col sizes={{all: 12}} className={b('floor', {attribution: true})}>
                            <BrandFooter className={b('attribution-block')} />
                        </Col>
                    )}
                </Row>
            </Grid>
        </footer>
    );
};

export default FooterBlock;
