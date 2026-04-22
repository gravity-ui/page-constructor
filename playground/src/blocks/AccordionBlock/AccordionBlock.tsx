import * as React from 'react';
import {Accordion} from '@gravity-ui/uikit';

export interface AccordionBlockItem {
    summary: string;
    content: string;
}

export interface AccordionBlockProps {
    items?: AccordionBlockItem[];
    size?: 'm' | 'l' | 'xl';
}

const AccordionBlock: React.FC<AccordionBlockProps> = ({items = [], size = 'm'}) => {
    return (
        <div style={{padding: '16px 24px'}}>
            <Accordion size={size}>
                {items.map((item, index) => (
                    <Accordion.Item
                        key={index}
                        summary={item.summary}
                        defaultExpanded={index === 0}
                    >
                        {item.content}
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default AccordionBlock;
