import * as React from 'react';

import {Image, RouterLink, YFMWrapper} from '../../components';
import {getMediaImage} from '../../components/Media/Image/utils';
import {useTheme} from '../../context/theme';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, FooterBlockProps, NavigationItemType} from '../../models';
import type {ImageProps as ModelImageProps} from '../../models';
import SocialIcon from '../../navigation/components/SocialIcon/SocialIcon';
import {block, getThemedValue} from '../../utils';
import { Link } from '@gravity-ui/uikit';

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

const LOGO_COL_SIZES = {md: 3, sm: 12, all: 12} as const;
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
            sizes={sizes}
        >
            <div className={b('column-inner')}>
                <h6 className={b('column-title')}>{column.title}</h6>
                <ul className={b('links')} role="list">
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
    socialLinks: NonNullable<FooterBlockProps['socialFloor']>['socialLinks'],
    theme: ReturnType<typeof useTheme>,
) {
    if (!socialLinks?.length) return null;
    return (
        <ul className={b('social-icons-list')} role="list">
            {socialLinks.map((social, index) => {
                const iconResolved = social.icon && getThemedValue(social.icon, theme);
                const iconProps = iconResolved && getLogoImageProps(iconResolved);
                if (!iconProps) return null;
                return (
                    <li key={index} className={b('social-icons-item')}>
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <Image
                                {...iconProps}
                                alt={social.urlTitle ?? ''}
                                className={b('social-icon-item')}
                            />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export const FooterBlock = (props: React.PropsWithChildren<FooterBlockFullProps>) => {
    const {
        logo,
        columns,
        additionalSections = [],
        socialFloor,
        disclaimerFloor,
        linksFloor,
        secondFloor,
        attributionFloor,
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
                    <Image
                        {...logoImageProps}
                        alt={logo.alt ?? ''}
                        className={b('logo-image')}
                    />
                </Link>
            ) : (
                <div className={b('logo-wrapper')}>
                    <Image
                        {...logoImageProps}
                        alt={logo.alt ?? ''}
                        className={b('logo-image')}
                    />
                </div>
            )}
        </div>
    );

    return (
        <footer
            className={b(null, className)}
            style={themedBackground ? {backgroundColor: themedBackground} : undefined}
        >
            <Grid className={b('main-container')}>
                {/* First row: logo + columns */}
                <Row className={b('row')}>
                    {hasLogo && (
                        <Col className={b('logo-col')} sizes={LOGO_COL_SIZES}>
                            {logoContent}
                        </Col>
                    )}
                    {renderColumns(columns, hasLogo, 0)}
                </Row>
                {/* Additional rows: spacer (align with logo) + section columns */}
                {additionalSections.map((section, sectionIndex) => (
                    <Row key={sectionIndex} className={b('row', {'additional': true})}>
                        {hasLogo && (
                            <Col className={b('logo-col', {'spacer': true})} sizes={LOGO_COL_SIZES} />
                        )}
                        {renderColumns(section.columns, hasLogo, sectionIndex + 1)}
                    </Row>
                ))}
            </Grid>
            {/* Floor 2: Social row (Join Us + icons) */}
            {socialFloor && socialFloor.socialLinks.length > 0 && (
                <div className={b('floor', 'social')}>
                    <Grid containerClass={b('container')}>
                        <div className={b('social-floor-inner')}>
                            {socialFloor.title && (
                                <h3 className={b('social-floor-title')}>{socialFloor.title}</h3>
                            )}
                            {renderSocialIcons(socialFloor.socialLinks, theme)}
                        </div>
                    </Grid>
                </div>
            )}
            {/* Floor 3: Legal disclaimer */}
            {disclaimerFloor && disclaimerFloor.content && (
                <div className={b('floor', 'disclaimer')}>
                    <Grid containerClass={b('container')}>
                        <div className={b('disclaimer-floor-content')}>
                            <YFMWrapper
                                content={disclaimerFloor.content}
                                modifiers={{constructor: true}}
                            />
                        </div>
                    </Grid>
                </div>
            )}
            {/* Floor 4: Links + language + copyright (linksFloor or legacy secondFloor) */}
            {(linksFloor || secondFloor) &&
                (linksFloor
                    ? linksFloor.links?.length ||
                      linksFloor.language ||
                      linksFloor.copyright
                    : secondFloor?.copyright ||
                      (secondFloor?.links && secondFloor.links.length > 0) ||
                      (secondFloor?.socialLinks && secondFloor.socialLinks.length > 0)) && (
                    <div className={b('floor', 'links')}>
                        <Grid containerClass={b('container')}>
                            <div className={b('links-floor-inner')}>
                                {linksFloor ? (
                                    <>
                                        <div className={b('links-floor-left')}>
                                            {linksFloor.links && linksFloor.links.length > 0 && (
                                                <ul className={b('links-floor-list')} role="list">
                                                    {linksFloor.links.map((link, i) => (
                                                        <li key={i} className={b('links-floor-item')}>
                                                            <RouterLink
                                                                href={link.url}
                                                                className={b('links-floor-link')}
                                                                title={link.urlTitle}
                                                                target={link.target}
                                                            >
                                                                {link.text}
                                                            </RouterLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                        <div className={b('links-floor-right')}>
                                            {linksFloor.language && (
                                                <RouterLink
                                                    href={linksFloor.language.url ?? '#'}
                                                    className={b('links-floor-language')}
                                                >
                                                    {linksFloor.language.label ?? 'Language'}
                                                </RouterLink>
                                            )}
                                            {linksFloor.copyright && (
                                                <span className={b('links-floor-copyright')}>
                                                    {linksFloor.copyright}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className={b('second-floor-inner')}>
                                        <div className={b('second-floor-left')}>
                                            {secondFloor!.copyright && (
                                                <span className={b('second-floor-copyright')}>
                                                    {secondFloor!.copyright}
                                                </span>
                                            )}
                                            {secondFloor!.links &&
                                                secondFloor!.links.length > 0 && (
                                                    <ul
                                                        className={b('second-floor-links')}
                                                        role="list"
                                                    >
                                                        {secondFloor!.links.map((link, i) => (
                                                            <li
                                                                key={i}
                                                                className={b(
                                                                    'second-floor-link-item',
                                                                )}
                                                            >
                                                                <RouterLink
                                                                    href={link.url}
                                                                    className={b(
                                                                        'second-floor-link',
                                                                    )}
                                                                    title={link.urlTitle}
                                                                    target={link.target}
                                                                >
                                                                    {link.text}
                                                                </RouterLink>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>
                                        {secondFloor!.socialLinks &&
                                            secondFloor!.socialLinks.length > 0 &&
                                            renderSocialIcons(
                                                secondFloor!.socialLinks,
                                                theme,
                                            )}
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </div>
                )}
            {/* Floor 5: Attribution */}
            {attributionFloor && attributionFloor.text && (
                <div className={b('floor', 'attribution')}>
                    <Grid containerClass={b('container')}>
                        <div className={b('attribution-floor-inner')}>
                            {(() => {
                                const attributionLogoResolved =
                                    attributionFloor.logo &&
                                    getThemedValue(attributionFloor.logo, theme);
                                const attributionLogoProps =
                                    attributionLogoResolved &&
                                    getLogoImageProps(
                                        attributionLogoResolved as ModelImageProps,
                                    );
                                const content = (
                                    <>
                                        {attributionFloor.text}
                                        {attributionLogoProps && (
                                            <Image
                                                {...attributionLogoProps}
                                                alt=""
                                                className={b('attribution-floor-logo')}
                                            />
                                        )}
                                    </>
                                );
                                return attributionFloor.href ? (
                                    <RouterLink
                                        href={attributionFloor.href}
                                        className={b('attribution-floor-link')}
                                    >
                                        {content}
                                    </RouterLink>
                                ) : (
                                    <span className={b('attribution-floor-text')}>
                                        {content}
                                    </span>
                                );
                            })()}
                        </div>
                    </Grid>
                </div>
            )}
        </footer>
    );
};

export default FooterBlock;
