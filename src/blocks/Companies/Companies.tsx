import React, {useContext} from 'react';

import {block, getThemedValue} from '../../utils';
import {CompaniesBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {BREAKPOINTS} from '../../constants';
import {ThemeValueContext} from '../../context/theme/ThemeValueContext';

import './Companies.scss';

const b = block('companies-block');

export const CompaniesBlock: React.FC<CompaniesBlockProps> = ({title, images, animated}) => {
    const {themeValue: theme} = useContext(ThemeValueContext);
    const themedImages = getThemedValue(images, theme) || {};
    const {desktop, mobile, tablet, alt} = themedImages;

    return (
        <AnimateBlock className={b()} offset={150} animate={animated}>
            <div className={b('content')}>
                <h2 className={b('title')}>{title}</h2>
                <div className={b('images')}>
                    <picture>
                        <source srcSet={desktop} media={`(min-width: ${BREAKPOINTS.md}px)`} />
                        <source srcSet={tablet} media={`(min-width: ${BREAKPOINTS.sm}px)`} />
                        <img className={b('image')} srcSet={mobile} alt={alt} />
                    </picture>
                </div>
            </div>
        </AnimateBlock>
    );
};

export default CompaniesBlock;
