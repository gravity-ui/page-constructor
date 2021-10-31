import React from 'react';

import {block} from '../../utils';
import {LinkTableBlockProps} from '../../models';
import {Row, Col, GridColumnSize} from '../../grid';
import Link from '../../components/Link/Link';
import BlockHeader from '../../components/BlockHeader/BlockHeader';

import './LinkTable.scss';

const b = block('LinkTable');

const LinkTable: React.FC<LinkTableBlockProps> = ({
    items,
    title,
    description,
    linkTheme = 'normal',
}) => {
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
