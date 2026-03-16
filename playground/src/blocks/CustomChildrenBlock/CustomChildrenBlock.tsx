import * as React from 'react';

export interface CustomChildrenBlockProps {
    title?: string;
    description?: string;
}

const CustomChildrenBlock: React.FC<CustomChildrenBlockProps> = ({title, description}) => {
    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '16px 20px',
                background: '#fff',
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
            }}
        >
            {title && (
                <div style={{fontSize: 16, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3}}>
                    {title}
                </div>
            )}
            {description && (
                <div style={{fontSize: 14, color: '#666', lineHeight: 1.5}}>{description}</div>
            )}
        </div>
    );
};

export default CustomChildrenBlock;
