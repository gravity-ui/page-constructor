import * as React from 'react';
import {ArrowUturnCcwLeft} from '@gravity-ui/icons';
import {CardBase, YFMWrapper} from '../../../../../components';
import {cn} from '../../../../../utils';

import './CustomCard.scss';
import {Link} from '@gravity-ui/uikit';
import {yfmTransform} from '../../../../../../.storybook/utils';

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
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={b({flipped: isFlipped})} onClick={flip}>
            <CardBase className={b('card', {bottom: true})} bodyClassName={b('card-body')}>
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
                            className={b('card-body-link-code')}
                            content={`<code>${content}</code>`}
                        />
                    </Link>
                </CardBase.Content>
            </CardBase>
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
                            className={b('card-body-description')}
                            content={yfmTransform(description)}
                        />
                    )}
                </CardBase.Content>
            </CardBase>
        </div>
    );
};
