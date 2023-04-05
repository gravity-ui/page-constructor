import React from 'react';

import BlockHeader from '../../components/BlockHeader/BlockHeader';
import Link from '../../components/Link/Link';
import {Col, GridColumnSize, Row} from '../../grid';
import {LinkTableBlockProps} from '../../models';
import {block} from '../../utils';

import './LinkTable.scss';

const b = block('LinkTable');

const LinkTable = ({items, title, description, linkTheme = 'normal'}: LinkTableBlockProps) => {
    return (
        <div className={b()}>
            <BlockHeader title={title} description={description} className={b('block-title')} />
            <Row className={b('links')}>
                {items.map((column, index) => (
                    <Col
                        key={(column.length && column[0].url) || index}
                        sizes={{
                            [GridColumnSize.Lg]: 4,
                            [GridColumnSize.Md]: 6,
                            [GridColumnSize.All]: 12,
                        }}
                    >
                        {column.map(({theme = linkTheme, ...link}) => (
                            <Link key={link.url} {...link} theme={theme} />
                        ))}
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default LinkTable;
