import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import {BrandFooter, Image} from '../../components';
import {useTheme} from '../../context/theme';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, FooterBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import {CopyrightFloor, DisclaimerFloor, NavigationFloor, SocialFloor} from './components/index';
import {useLogoImageProps} from './hooks/useLogoImageProps';

import './Footer.scss';

const b = block('footer-block');

export type FooterBlockFullProps = FooterBlockProps & ClassNameProps;

export const FooterBlock = (props: React.PropsWithChildren<FooterBlockFullProps>) => {
    const {navigation, contacts, disclaimer, copyright, attribution, backgroundColor, className} =
        props;
    const theme = useTheme();
    const {logo, columns, colSizes} = navigation || {};
    const themedBackground = backgroundColor && getThemedValue(backgroundColor, theme);
    const logoImage = logo?.image && getThemedValue(logo.image, theme);
    const logoImageProps = useLogoImageProps(logoImage);
    const hasLogo = Boolean(logo && logoImageProps);

    const logoContent = logo && logoImageProps && (
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

    return (
        <footer
            className={b(null, className)}
            style={themedBackground ? {backgroundColor: themedBackground} : undefined}
        >
            <Grid className={b('main-container')}>
                <Row className={b('row')}>
                    {columns && (
                        <NavigationFloor
                            hasLogo={hasLogo}
                            columns={columns}
                            colSizes={colSizes}
                            logoContent={logoContent}
                        />
                    )}
                    {contacts && <SocialFloor contacts={contacts} />}
                    {disclaimer && <DisclaimerFloor disclaimer={disclaimer} />}
                    {copyright && <CopyrightFloor copyright={copyright} />}
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
