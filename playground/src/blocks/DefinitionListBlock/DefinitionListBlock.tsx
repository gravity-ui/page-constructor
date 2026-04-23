import * as React from 'react';

import {DefinitionList} from '@gravity-ui/uikit';

export interface DefinitionListItem {
    name: string;
    value: string;
    copyText?: string;
    note?: string;
}

export interface DefinitionListBlockProps {
    title?: string;
    items?: DefinitionListItem[];
    direction?: 'horizontal' | 'vertical';
    responsive?: boolean;
    nameMaxWidth?: number;
    contentMaxWidth?: number;
}

const DefinitionListBlock: React.FC<DefinitionListBlockProps> = ({
    title,
    items = [],
    direction = 'horizontal',
    responsive = false,
    nameMaxWidth,
    contentMaxWidth,
}) => {
    return (
        <div
            style={{
                maxWidth: responsive ? '100%' : 1200,
                margin: '0 auto',
                padding: '18px 24px',
                boxSizing: 'border-box',
                width: '100%',
            }}
        >
            {title && (
                <h2
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        margin: '0 0 24px',
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </h2>
            )}
            <DefinitionList
                direction={direction}
                responsive={responsive}
                nameMaxWidth={nameMaxWidth}
                contentMaxWidth={contentMaxWidth}
            >
                {items.map((item, index) => (
                    <DefinitionList.Item
                        key={index}
                        name={item.name}
                        copyText={item.copyText}
                        note={item.note}
                    >
                        {item.value}
                    </DefinitionList.Item>
                ))}
            </DefinitionList>
        </div>
    );
};

export default DefinitionListBlock;
