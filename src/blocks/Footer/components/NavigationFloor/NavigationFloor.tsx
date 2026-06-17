import * as React from 'react';

import {Link} from '@gravity-ui/uikit';

import type {GridColumnSizesType} from '../../../../grid';
import {Col, Row} from '../../../../grid';
import {FooterLinkColumn} from '../../../../models';
import {block} from '../../../../utils';

import './NavigationFloor.scss';

const b = block('footer-block');

const DEFAULT_COL_SIZES_WITH_LOGO: GridColumnSizesType = {all: 6, sm: 3, md: 3, lg: 3};
const DEFAULT_COL_SIZES_WITHOUT_LOGO: GridColumnSizesType = {all: 6, sm: 4, md: 3, lg: 0};
const DEFAULT_LOGO_COL_SIZES: GridColumnSizesType = {all: 12, md: 4};

type NavigationColumnsProps = {
    columns: FooterLinkColumn[];
    hasLogo: boolean;
    colSizes?: GridColumnSizesType;
    columnsPerRow?: number;
};

function NavigationColumns({columns, hasLogo, colSizes, columnsPerRow}: NavigationColumnsProps) {
    const defaultColSizes: GridColumnSizesType = hasLogo
        ? DEFAULT_COL_SIZES_WITH_LOGO
        : DEFAULT_COL_SIZES_WITHOUT_LOGO;
    const resolvedColSizes: GridColumnSizesType = React.useMemo(
        () => ({
            all: colSizes?.all ?? defaultColSizes.all,
            sm: colSizes?.sm ?? defaultColSizes.sm,
            md: colSizes?.md ?? defaultColSizes.md,
            lg: colSizes?.lg ?? defaultColSizes.lg,
        }),
        [colSizes, defaultColSizes],
    );
    const customColumnsStyle = columnsPerRow
        ? ({
              '--pc-footer-navigation-column-width': `${100 / columnsPerRow}%`,
          } as React.CSSProperties)
        : undefined;

    return (
        <Col className={b('columns-container')}>
            <Row
                className={b('nav-row', {'custom-columns': Boolean(columnsPerRow)})}
                style={customColumnsStyle}
            >
                {columns.map((column, columnIndex) => (
                    <Col key={columnIndex} className={b('column')} sizes={resolvedColSizes}>
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

type NavigationFloorProps = {
    columns: FooterLinkColumn[];
    logoContent: React.ReactNode;
    colSizes?: GridColumnSizesType;
    columnsPerRow?: number;
    logoPlacement?: 'left' | 'top';
};

export const NavigationFloor = ({
    columns,
    logoContent,
    colSizes,
    columnsPerRow,
    logoPlacement,
}: NavigationFloorProps) => {
    const isTopLogoPlacement = logoPlacement === 'top';
    const hasSideLogo = Boolean(logoContent) && !isTopLogoPlacement;

    return (
        <Row className={b('floor', {navigation: true, 'logo-placement-top': isTopLogoPlacement})}>
            {logoContent && isTopLogoPlacement && (
                <Col className={b('logo-col', {top: true})} sizes={{all: 12}}>
                    {logoContent}
                </Col>
            )}
            {logoContent && !isTopLogoPlacement && (
                <Col className={b('logo-col')} sizes={DEFAULT_LOGO_COL_SIZES}>
                    <Row>{logoContent}</Row>
                </Col>
            )}
            <NavigationColumns
                columns={columns}
                hasLogo={hasSideLogo}
                colSizes={colSizes}
                columnsPerRow={columnsPerRow}
            />
        </Row>
    );
};
