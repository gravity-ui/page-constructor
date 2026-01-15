/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';

import {ArrowUturnCcwLeft} from '@gravity-ui/icons';
import {Link} from '@gravity-ui/uikit';

import {yfmTransform} from '../../../../../../.storybook/utils';
import {CardBase, YFMWrapper} from '../../../../../components';
import {cn} from '../../../../../utils';

import './CustomCard.scss';

const b = cn('custom-card');

const CUSTOM_CARD_CODE = `
const CustomCard = ...;

const customConfig: CustomConfig = {
    ...
    subBlocks: {
        ['custom-card']: CustomCard,
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export interface CustomCardProps {
    url?: string;
    title?: string;
    description?: string;
    content?: string;
}

export const CustomCard = ({
    url,
    title,
    description,
    content = CUSTOM_CARD_CODE,
}: CustomCardProps) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const flip = () => setIsFlipped((prev) => !prev);

    return (
        <div className={b({flipped: isFlipped})}>
            <div className={b('card-wrap', {bottom: true})} onClick={flip}>
                <CardBase className={b('card')} bodyClassName={b('card-body')}>
                    <CardBase.Header className={b('card-header')}>
                        <div className={b('card-header-content')}>
                            <h2 className={b('card-header-content-title')}>{title}</h2>
                            <ArrowUturnCcwLeft
                                className={b('card-header-content-flip-icon')}
                                width={20}
                                height={20}
                            />
                        </div>
                    </CardBase.Header>
                    <CardBase.Content>
                        <Link
                            className={b('card-body-link')}
                            href={url ?? ''}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <YFMWrapper
                                contentClassName={b('card-body-link-code')}
                                content={`<code>${content}</code>`}
                            />
                        </Link>
                    </CardBase.Content>
                </CardBase>
            </div>
            <div className={b('card-wrap')} onClick={flip}>
                <CardBase className={b('card')} bodyClassName={b('card-body')}>
                    <CardBase.Header className={b('card-header')}>
                        <div className={b('card-header-content')}>
                            <h2 className={b('card-header-content-title')}>{title}</h2>
                            <ArrowUturnCcwLeft
                                className={b('card-header-content-flip-icon')}
                                width={20}
                                height={20}
                            />
                        </div>
                    </CardBase.Header>
                    <CardBase.Content>
                        {description && (
                            <YFMWrapper
                                contentClassName={b('card-body-description')}
                                content={yfmTransform(description)}
                                tagName="div"
                            />
                        )}
                    </CardBase.Content>
                </CardBase>
            </div>
        </div>
    );
};
