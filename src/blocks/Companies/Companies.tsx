import React from 'react';

import {Image, YFMWrapper} from '../../components';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {useTheme} from '../../context/theme';
import {CompaniesBlockProps} from '../../models';
import {block, getThemedValue} from '../../utils';

import './Companies.scss';

const b = block('companies-block');

export const CompaniesBlock = ({title, description, images, animated}: CompaniesBlockProps) => {
    const theme = useTheme();
    const themedImages = getThemedValue(images, theme) || {};

    return (
        <AnimateBlock className={b()} offset={150} animate={animated}>
            <div className={b('content')}>
                <h2 className={b('title')}>{title}</h2>
                {description && (
                    <div className={b('description')}>
                        <YFMWrapper content={description} modifiers={{constructor: true}} />
                    </div>
                )}
                <div className={b('images')}>
                    <Image {...themedImages} className={b('image')} />
                </div>
            </div>
        </AnimateBlock>
    );
};

export default CompaniesBlock;
