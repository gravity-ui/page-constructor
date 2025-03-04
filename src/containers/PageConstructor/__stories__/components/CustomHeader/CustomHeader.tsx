import {Link} from '@gravity-ui/uikit';
import {HeaderBlock} from '../../../../../blocks';
import {YFMWrapper} from '../../../../../components';
import {HeaderBlockProps} from '../../../../../models';
import {cn} from '../../../../../utils';

import './CustomHeader.scss';

const b = cn('custom-header');

const CUSTOM_HEADER_CODE = `
const CustomHeader = ...;

const customConfig: CustomConfig = {
    ...
    headers: {
        ['custom-header']: CustomHeader,
    },
};

...

<PageConstructor {...props} custom={customConfig} />
`
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

interface CustomHeaderProps extends HeaderBlockProps {
    url?: string;
}

export const CustomHeader = ({url, ...props}: CustomHeaderProps) => {
    const Wrapper = url ? Link : 'div';

    return (
        <HeaderBlock {...props} className={b()}>
            <Wrapper className={b('code')} href={url ?? ''}>
                <YFMWrapper
                    className={b('code-yfm')}
                    content={`<code>${CUSTOM_HEADER_CODE}</code>`}
                />
            </Wrapper>
        </HeaderBlock>
    );
};
