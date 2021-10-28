import React from 'react';
import block from 'bem-cn-lite';

import {CompaniesBlockProps} from '../../models';
import AnimateBlock from '../../components/AnimateBlock/AnimateBlock';
import {BREAKPOINTS} from '../../constants';

import './Companies.scss';

const b = block('companies-block');

const CompaniesBlock: React.FC<CompaniesBlockProps> = ({title, images = {}, animated}) => {
    const {desktop, mobile, tablet, alt} = images;

    return (
        <AnimateBlock className={b()} offset={150} animate={animated}>
            <div className={b('content')}>
                <h2>{title}</h2>
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
