import * as React from 'react';
import {Card} from '@gravity-ui/uikit';
import ChildrenItemWrap from '../../../../src/components/editor/ChildrenItemWrap/ChildrenItemWrap';
import ChildrensWrap from '../../../../src/components/editor/ChildrensWrap/ChildrensWrap';

export interface CardContainerProps extends React.PropsWithChildren {
    title?: string;
    description?: string;
    theme?: 'normal' | 'info' | 'success' | 'warning' | 'danger';
    view?: 'outlined' | 'filled' | 'raised';
    size?: 'm' | 'l';
}

const CardContainer: React.FC<CardContainerProps> = ({
    title,
    description,
    theme = 'normal',
    view = 'outlined',
    size = 'l',
    children,
}) => {
    return (
        <div style={{padding: '16px 24px', width: '100%', boxSizing: 'border-box'}}>
            <Card type="container" theme={theme} view={view} size={size}>
                {(title || description) && (
                    <div style={{marginBottom: 16, padding: '16px 16px 0'}}>
                        {title && (
                            <h3
                                style={{
                                    margin: '0 0 8px',
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: 'var(--g-color-text-primary)',
                                }}
                            >
                                {title}
                            </h3>
                        )}
                        {description && (
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 14,
                                    color: 'var(--g-color-text-secondary)',
                                    lineHeight: 1.5,
                                }}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div style={{padding: '0 16px 16px'}}>
                    <ChildrensWrap>
                        {React.Children.map(children, (child, index) => (
                            <ChildrenItemWrap index={index}>{child}</ChildrenItemWrap>
                        ))}
                    </ChildrensWrap>
                </div>
            </Card>
        </div>
    );
};

export default CardContainer;
