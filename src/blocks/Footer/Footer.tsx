import * as React from 'react';

import {DropdownMenu, Flex, Link, Menu, MenuItem, Text} from '@gravity-ui/uikit';

import {BrandFooter, Image, YFMWrapper} from '../../components';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useTheme} from '../../context/theme';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, FooterBlockProps} from '../../models';
import type {ImageProps as ModelImageProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import {LangSwitcher} from './components/LangSwitcher';
import {useOverflowListItems} from './hooks/useOverflowListItems';

import './Footer.scss';

const b = block('footer-block');

export type FooterBlockFullProps = FooterBlockProps & ClassNameProps;

function getLogoImageProps(logoImage: ModelImageProps): Record<string, unknown> | null {
    const resolved = getMediaImage(logoImage);
    if (typeof resolved === 'string') {
        return {src: resolved};
    }
    return resolved && typeof resolved === 'object' ? (resolved as Record<string, unknown>) : null;
}

const COL_COL_SIZES = {md: 2, sm: 6, all: 12} as const;
const COL_COL_SIZES_NO_LOGO = {md: 3, sm: 6, all: 12} as const;

function renderColumns(
    columns: FooterBlockProps['columns'],
    hasLogo: boolean,
    sectionIndex: number,
) {
    const sizes = hasLogo ? COL_COL_SIZES : COL_COL_SIZES_NO_LOGO;
    return columns.map((column, columnIndex) => (
        <Col
            key={`${sectionIndex}-${columnIndex}`}
            className={b('column')}
            sizes={{all: 6, sm: 3, md: 2}}
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
    ));
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
    const {visibleItems, hiddenItems, measured} = useOverflowListItems({
        containerRef: menuContainerRef,
        items: copyright?.links,
        itemSelector: `.${b('links-floor-item')}`,
        moreButtonWidth: 28,
    });

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
                        {renderColumns(columns, hasLogo, 0)}
                    </Row>
                    {/* Floor 2: Social row (Join Us + icons) */}
                    {contacts && contacts.links.length > 0 && (
                        <Col sizes={{all: 12}} className={b('floor')}>
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
                        <Col sizes={{all: 12}} className={b('floor')}>
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
                        <Col sizes={{all: 12}} className={b('floor')}>
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
                                        <Menu className={b('links-floor-list')}>
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
                                    {hiddenItems.length > 0 && (
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
                        <Col sizes={{all: 12}} className={b('floor', 'attribution')}>
                            <BrandFooter className={b('attribution-block')} />
                        </Col>
                    )}
                </Row>
            </Grid>
        </footer>
    );
};

export default FooterBlock;
