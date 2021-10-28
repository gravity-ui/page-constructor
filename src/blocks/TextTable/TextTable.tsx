import React from 'react';
import block from 'bem-cn-lite';
import {TextTableBlockProps} from '../../models';
import YFMWrapper from '../../components/YFMWrapper/YFMWrapper';
import {Button} from '../../components';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import BlockHeader from '../../components/BlockHeader/BlockHeader';

import './TextTable.scss';

const b = block('text-table-block');

const TextTable: React.FunctionComponent<TextTableBlockProps> = ({
    button,
    content,
    title,
    animated,
    description,
}) => (
    <AnimateBlock className={b()} animate={animated}>
        <BlockHeader title={title} description={description} />
        <div className={b('container')}>
            <YFMWrapper
                content={content}
                modifiers={{
                    constructor: true,
                    ['constructor-table']: true,
                    redefinitions: true,
                }}
            />
        </div>
        {button && <Button className={b('button')} size="xl" {...button} />}
    </AnimateBlock>
);

export default TextTable;
