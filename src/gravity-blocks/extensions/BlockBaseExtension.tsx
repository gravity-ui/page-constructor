import * as React from 'react';

import BlockBase from '../../components/BlockBase/BlockBase';
import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import type {BlockBaseProps, BlockWrapperDataProps} from '../../models';

export const BlockBaseExtensionBlockWrapper: React.FC<
    BlockWrapperDataProps<BlockBaseProps> & React.PropsWithChildren
> = ({props, content, children}) => (
    <BlockBase
        anchor={content?.anchor ?? props?.anchor}
        indent={content?.indent ?? props?.indent}
        visible={content?.visible ?? props?.visible}
        resetPaddings={content?.resetPaddings ?? props?.resetPaddings}
        qa={content?.qa ?? props?.qa}
    >
        {children}
    </BlockBase>
);

export const blockBaseExtension = (): PageConstructorExtension<{}, {}, BlockBaseProps> => ({
    name: 'Block Base',
    id: '@gravity-ui/page-constructor/block-base',
    settings: {
        blockWrapper: BlockBaseExtensionBlockWrapper,
        blockInputs: [
            {
                type: 'section',
                title: 'Block Base',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Anchor',
                        name: 'anchor.url',
                        placeholder: '#',
                    },
                    {
                        type: 'textInput',
                        title: 'Anchor text',
                        name: 'anchor.text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'select',
                        title: 'Top indent',
                        name: 'indent.top',
                        hasClear: true,
                        options: [
                            {value: '0'},
                            {value: 'xs', content: 'XS'},
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                        ],
                        defaultValue: 'l',
                    },
                    {
                        type: 'select',
                        title: 'Bottom indent',
                        name: 'indent.bottom',
                        hasClear: true,
                        options: [
                            {value: '0'},
                            {value: 'xs', content: 'XS'},
                            {value: 's', content: 'S'},
                            {value: 'm', content: 'M'},
                            {value: 'l', content: 'L'},
                            {value: 'xl', content: 'XL'},
                        ],
                        defaultValue: 'l',
                    },
                    {
                        type: 'select',
                        title: 'Hide on breakpoint',
                        name: 'visible',
                        hasClear: true,
                        options: [
                            {value: 'sm', content: 'SM only'},
                            {value: 'md', content: 'MD and down'},
                            {value: 'lg', content: 'LG and down'},
                            {value: 'xl', content: 'XL and down'},
                        ],
                    },
                ],
            },
        ],
    },
});
