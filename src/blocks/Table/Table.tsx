import {Table, YFMWrapper} from '../../components';
import {Col, Grid, GridColumnSize, Row} from '../../grid';
import {TableBlockProps} from '../../models';
import {block} from '../../utils';

import {TableMicrodataValues} from './models';

import './Table.scss';

const b = block('table-block');

export const TableBlock = (props: TableBlockProps) => {
    const {title, table} = props;

    return (
        <div className={b()} itemScope itemType={TableMicrodataValues.TableType}>
            <meta itemProp={TableMicrodataValues.accessModeProp} content="textual" />
            <Grid className={b('content')}>
                <Row className={b('row')}>
                    <Col sizes={{[GridColumnSize.Md]: 4, [GridColumnSize.All]: 12}}>
                        <YFMWrapper
                            tagName="h2"
                            contentClassName={b('title')}
                            itemProp={TableMicrodataValues.AboutProp}
                            content={title}
                            modifiers={{
                                constructor: true,
                            }}
                        />
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
