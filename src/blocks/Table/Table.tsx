import React from 'react';
import block from 'bem-cn-lite';

import {Grid, Row, Col, GridColumnSize} from '../../grid';
import {TableBlockProps} from '../../models';
import {Table} from '../../components';

import './Table.scss';

const b = block('table-block');

const TableBlock: React.FC<TableBlockProps> = (props) => {
    const {title, table} = props;

    return (
        <div className={b()}>
            <Grid className={b('content')}>
                <Row className={b('row')}>
                    <Col sizes={{[GridColumnSize.Md]: 4, [GridColumnSize.All]: 12}}>
                        <h2 className={b('title')}>{title}</h2>
                    </Col>
                    <Col sizes={{[GridColumnSize.Md]: 8, [GridColumnSize.All]: 12}}>
                        <Table className={b('table')} {...table} />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default TableBlock;
