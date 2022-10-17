import React, {useContext} from 'react';

import {block, getThemedValue} from '../../utils';
import {CompaniesBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';
import {Image} from '../../components';

import './Companies.scss';

const b = block('companies-block');

export const CompaniesBlock = ({title, images, animated}: CompaniesBlockProps) => {
    const {themeValue: theme} = useContext(ThemeValueContext);
    const themedImages = getThemedValue(images, theme) || {};

    return (
        <AnimateBlock className={b()} offset={150} animate={animated}>
            <div className={b('content')}>
                <h2 className={b('title')}>{title}</h2>
                <div className={b('images')}>
                    <Image {...themedImages} />
                </div>
            </div>
        </AnimateBlock>
    );
};

export default CompaniesBlock;
