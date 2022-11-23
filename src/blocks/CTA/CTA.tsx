import React from 'react';
import {Content, ContentBlockProps, NewMetrikaGoal} from '@gravity-ui/page-constructor';

import {Wrapper, PaddingSize} from '../../components/Wrapper/Wrapper';
import {getBlogElementMetrika, checkContentDefaults} from '../../utils/blog';

import {BlogMetrikaGoalIds} from '../../constants';

import {block} from '../../utils/cn';

import './CTA.scss';

const b = block('cta');

const MAX_COLUMN_COUNT = 4,
    MIN_COLUMN_COUNT = 2,
    DEFAULT_COLUMN_COUNT = 3;

export type CTAProps = {
    items: Array<ContentBlockProps>;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    columnCount?: number;
};

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
        <Wrapper paddingTop={paddingTop} paddingBottom={paddingBottom} className={b('content')}>
            {items.slice(0, count).map((contentData: ContentBlockProps, index: number) => {
                checkContentDefaults(contentData);

                contentData.links?.forEach((link) => {
                    link.metrikaGoals = getBlogElementMetrika(metrikaGoal, link.metrikaGoals);
                });

                return (
                    <div
                        key={index}
                        className={b('button', {
                            ['layout']: count,
                        })}
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
