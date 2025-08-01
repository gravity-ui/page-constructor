import {Link} from '@gravity-ui/uikit';

import {yfmTransform} from '../../../../../../.storybook/utils';
import {Title, YFMWrapper} from '../../../../../components';
import {cn} from '../../../../../utils';

import './CustomBlock.scss';

const b = cn('custom-block');

const CUSTOM_BLOCK_CODE = `
const CustomBlock = ...;

const customConfig: CustomConfig = {
    ...
    blocks: {
        ['custom-block']: CustomBlock,
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

interface CustomBlockProps {
    url?: string;
    title?: string;
    description?: string;
}

export const CustomBlock = ({url, title, description}: CustomBlockProps) => {
    const Wrapper = url ? Link : 'div';

    return (
        <div className={b()}>
            <Title className={b('title')} title={title} />
            {description && (
                <YFMWrapper className={b('description')} content={yfmTransform(description)} />
            )}
            <Wrapper className={b('code-wrap')} href={url ?? ''}>
                <YFMWrapper content={`<code>${CUSTOM_BLOCK_CODE}</code>`} />
            </Wrapper>
        </div>
    );
};
