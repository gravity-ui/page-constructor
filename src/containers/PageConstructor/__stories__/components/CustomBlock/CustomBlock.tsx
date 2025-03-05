import {Link} from '@gravity-ui/uikit';

import './CustomBlock.scss';
import {cn} from '../../../../../utils';
import {Title, YFMWrapper} from '../../../../../components';

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
}

export const CustomBlock = ({url, title}: CustomBlockProps) => {
    const Wrapper = url ? Link : 'div';

    return (
        <div className={b()}>
            <Title className={b('title')} title={title} />
            <Wrapper className={b('code-wrap')} href={url ?? ''}>
                <YFMWrapper content={`<code>${CUSTOM_BLOCK_CODE}</code>`} />
            </Wrapper>
        </div>
    );
};
