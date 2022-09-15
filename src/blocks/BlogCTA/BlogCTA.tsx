import React from 'react';
import block from 'bem-cn-lite';
import {Content, ContentBlockProps, NewMetrikaGoal} from '@yandex-data-ui/page-constructor';

import {BlogWrapper, PaddingSize} from '../../components/BlogWrapper/BlogWrapper';
import {getBlogElementMetrika, checkContentDefaults} from '../../utils/blog';

import {BlogMetrikaGoalIds} from '../../constants';

import './BlogCTA.scss';

const b = block('BlogCTABlock');

const MAX_COLUMN_COUNT = 4,
    MIN_COLUMN_COUNT = 2,
    DEFAULT_COLUMN_COUNT = 3;

export type CTABlockProps = {
    items: Array<ContentBlockProps>;
    paddingTop?: PaddingSize;
    paddingBottom?: PaddingSize;
    columnCount?: number;
};

export const BlogCTABlock: React.FC<CTABlockProps> = ({items, paddingTop, paddingBottom}) => {
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
        <BlogWrapper
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            className={b('content')}
            dataQa="blog-cta-content"
        >
            {items.slice(0, count).map((contentData: ContentBlockProps, index: number) => {
                checkContentDefaults(contentData);

                contentData.links?.forEach((link) => {
                    link.metrikaGoals = getBlogElementMetrika(metrikaGoal, link.metrikaGoals);
                });

                return (
                    <div
                        key={index}
                        className={b('cta-button', {
                            ['layout']: count,
                        })}
                        data-qa="blog-cta-card"
                    >
                        <div className={b('cta-card')}>
                            <Content {...contentData} />
                        </div>
                    </div>
                );
            })}
        </BlogWrapper>
    );
};
