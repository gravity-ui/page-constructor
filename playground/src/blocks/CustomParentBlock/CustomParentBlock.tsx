import * as React from 'react';
import ChildrenItemWrap from '../../../../src/components/editor/ChildrenItemWrap/ChildrenItemWrap';

export type PerRow = 3 | 4 | 5;

export interface CustomParentBlockProps extends React.PropsWithChildren {
    title?: string;
    description?: string;
    perRow?: PerRow;
}

const COLUMN_WIDTH: Record<PerRow, string> = {
    3: 'calc(33.333% - 16px)',
    4: 'calc(25% - 16px)',
    5: 'calc(20% - 16px)',
};

const CustomParentBlock: React.FC<CustomParentBlockProps> = ({
    title,
    description,
    perRow = 3,
    children,
}) => {
    const colWidth = COLUMN_WIDTH[perRow] ?? COLUMN_WIDTH[3];

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '48px 24px',
                boxSizing: 'border-box',
            }}
        >
            {(title || description) && (
                <div style={{marginBottom: 40}}>
                    {title && (
                        <h2
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                color: '#1a1a1a',
                                margin: '0 0 12px',
                                lineHeight: 1.2,
                            }}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p
                            style={{
                                fontSize: 16,
                                color: '#555',
                                margin: 0,
                                lineHeight: 1.6,
                                maxWidth: 640,
                            }}
                        >
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                }}
            >
                {React.Children.map(children, (child, index) => (
                    <div
                        style={{
                            width: colWidth,
                            minWidth: 160,
                            flexShrink: 0,
                        }}
                    >
                        <ChildrenItemWrap index={index}>{child}</ChildrenItemWrap>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomParentBlock;
