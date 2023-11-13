import React from 'react';

import {Image} from '../../components';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {useTheme} from '../../context/theme';
import {CompaniesBlockProps} from '../../models';
import {block, getQaAttrubutes, getThemedValue} from '../../utils';

import './Companies.scss';

const b = block('companies-block');

export const CompaniesBlock = ({title, images, animated, qa}: CompaniesBlockProps) => {
    const qaAttributes = getQaAttrubutes(qa, 'title');
    const theme = useTheme();
    const themedImages = getThemedValue(images, theme) || {};

    return (
        <AnimateBlock className={b()} offset={150} animate={animated} qa={qaAttributes.default}>
            <div className={b('content')}>
                <h2 className={b('title')} data-qa={qaAttributes.title}>
                    {title}
                </h2>
                <div className={b('images')}>
                    <Image {...themedImages} className={b('image')} />
                </div>
            </div>
        </AnimateBlock>
    );
};

export default CompaniesBlock;
