'use client';

import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import {BrandFooter, Image} from '../../components';
import {useTheme} from '../../context/theme';
import {Col, Grid, Row} from '../../grid';
import {ClassNameProps, FooterBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import {CopyrightFloor} from './components/CopyrightFloor/CopyrightFloor';
import {DisclaimerFloor} from './components/DisclaimerFloor/DisclaimerFloor';
import {NavigationFloor} from './components/NavigationFloor/NavigationFloor';
import {SocialFloor} from './components/SocialFloor/SocialFloor';
import {useLogoImageProps} from './hooks/useLogoImageProps';

import './Footer.scss';

const b = block('footer-block');

export type FooterBlockFullProps = FooterBlockProps & ClassNameProps;

export const FooterBlock = (props: React.PropsWithChildren<FooterBlockFullProps>) => {
    const {
        navigation,
        contacts,
        disclaimer,
        copyright,
        attribution,
        backgroundColor,
        className,
        indentTop,
    } = props;
    const theme = useTheme();
    const {logo, columns, colSizes, columnsPerRow} = navigation || {};
    const themedBackground = backgroundColor && getThemedValue(backgroundColor, theme);
    const footerStyle = themedBackground
        ? ({
              ...(themedBackground && {backgroundColor: themedBackground}),
          } as React.CSSProperties)
        : undefined;
    const logoImage = logo?.image && getThemedValue(logo.image, theme);
    const logoImageProps = useLogoImageProps(logoImage);

    const logoContent = logo && logoImageProps && (
        <div className={b('logo')}>
            {logo.url ? (
                <Link href={logo.url}>
                    <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
                </Link>
            ) : (
                <Image {...logoImageProps} alt={logo.alt ?? ''} className={b('logo-image')} />
            )}
        </div>
    );

    const footer = (
        <footer className={b({indentTop}, className)} style={footerStyle}>
            <Grid className={b('main-container')}>
                <Row className={b('row')}>
                    {columns && (
                        <NavigationFloor
                            columns={columns}
                            colSizes={colSizes}
                            columnsPerRow={columnsPerRow}
                            logoContent={logoContent}
                            logoPlacement={logo?.placement ?? 'left'}
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

    return footer;
};

export default FooterBlock;
