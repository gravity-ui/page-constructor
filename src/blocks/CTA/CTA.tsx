import React from 'react';
import {Content, ContentBlockProps, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper} from '../../components/Wrapper/Wrapper';
import {getBlogElementMetrika, updateContentSizes} from '../../utils/common';

import {PaddingsDirections, PaddingsYFMProps} from '../../models/paddings';

import {BlogMetrikaGoalIds} from '../../constants';

import {block} from '../../utils/cn';

import './CTA.scss';

const b = block('cta');

const MAX_COLUMN_COUNT = 4,
    MIN_COLUMN_COUNT = 2,
    DEFAULT_COLUMN_COUNT = 3;

export type CTAProps = {
    items: Array<ContentBlockProps>;
    columnCount?: number;
} & PaddingsYFMProps;

export const CTA: React.FC<CTAProps> = ({items, paddingTop, paddingBottom}) => {
    let count = items ? items.length : DEFAULT_COLUMN_COUNT;

    if (count < MIN_COLUMN_COUNT) {
        count = MIN_COLUMN_COUNT;
    } else if (count > MAX_COLUMN_COUNT) {
        count = MAX_COLUMN_COUNT;
    }

    const metrikaGoal: NewMetrikaGoal = {
        name: BlogMetrikaGoalIds.cta,
        isCrossSite: true,
    };

    return (
        <Wrapper
            paddings={{
                [PaddingsDirections.top]: paddingTop,
                [PaddingsDirections.bottom]: paddingBottom,
            }}
            className={b('content')}
            dataQa="blog-cta-content"
        >
            {items.slice(0, count).map((content: ContentBlockProps, index: number) => {
                const contentData = updateContentSizes(content);

                contentData.links?.forEach((link) => {
                    link.metrikaGoals = getBlogElementMetrika(metrikaGoal, link.metrikaGoals);
                });

                return (
                    <div
                        key={index}
                        className={b('button', {
                            ['layout']: count,
                        })}
                        data-qa="blog-cta-card"
                    >
                        <div className={b('card')}>
                            <Content {...contentData} />
                        </div>
                    </div>
                );
            })}
        </Wrapper>
    );
};
