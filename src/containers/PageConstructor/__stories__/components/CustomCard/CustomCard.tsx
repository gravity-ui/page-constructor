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
    content?: string;
}

export const CustomCard = ({url, title, content = CUSTOM_CARD_CODE}: CustomCardProps) => (
    <div className={b()}>
        <CardBase className={b('card')} bodyClassName={b('card-body')} url={url}>
            <CardBase.Header className={b('card-header')}>
                <h2 className={b('card-header-content')}>{title}</h2>
            </CardBase.Header>
            <CardBase.Content>
                <YFMWrapper content={`<code>${content}</code>`} />
            </CardBase.Content>
        </CardBase>
    </div>
);
