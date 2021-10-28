import React from 'react';
import block from 'bem-cn-lite';

import {SimpleBlockProps} from 'units/constructor/models';
import AnimateBlock from 'units/constructor/components/AnimateBlock/AnimateBlock';
import BlockHeader from 'units/constructor/components/BlockHeader/BlockHeader';
import YFMWrapper from 'components/YFMWrapper/YFMWrapper';

import './Simple.scss';

const b = block('simple-block');

const SimpleBlock: React.FC<SimpleBlockProps> = (props) => {
    const {title, description, animated = true, children} = props;

    const blockHeader = title && <BlockHeader title={title} />;

    return (
        <AnimateBlock className={b()} animate={animated}>
            <div>
                {blockHeader}
                <div className={b('description')}>
                    <YFMWrapper content={description} />
                </div>
                <div className={b('animate-block')}>{children}</div>
            </div>
        </AnimateBlock>
    );
};

export default SimpleBlock;
