import * as React from 'react';

import {Breadcrumbs} from '@gravity-ui/uikit';

export interface BreadcrumbsItem {
    text: string;
    href?: string;
}

export interface BreadcrumbsBlockProps {
    items?: BreadcrumbsItem[];
}

const BreadcrumbsBlock: React.FC<BreadcrumbsBlockProps> = ({items = []}) => {
    if (items.length === 0) return null;

    return (
        <div style={{padding: '16px 24px'}}>
            <Breadcrumbs>
                {items.map((item, index) => (
                    <Breadcrumbs.Item key={index} href={item.href}>
                        {item.text}
                    </Breadcrumbs.Item>
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default BreadcrumbsBlock;
