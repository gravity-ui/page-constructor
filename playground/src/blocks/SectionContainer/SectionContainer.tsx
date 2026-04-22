import * as React from 'react';
import {Divider} from '@gravity-ui/uikit';
import ChildrenItemWrap from '../../../../src/components/editor/ChildrenItemWrap/ChildrenItemWrap';
import ChildrensWrap from '../../../../src/components/editor/ChildrensWrap/ChildrensWrap';

const BACKGROUND: Record<string, string> = {
    none: 'transparent',
    subtle: 'var(--g-color-base-generic)',
    brand: 'var(--g-color-base-brand)',
};

export interface SectionContainerProps extends React.PropsWithChildren {
    title?: string;
    description?: string;
    background?: 'none' | 'subtle' | 'brand';
    withDivider?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
    title,
    description,
    background = 'none',
    withDivider = false,
    children,
}) => {
    const isBrand = background === 'brand';

    return (
        <div
            style={{
                width: '100%',
                boxSizing: 'border-box',
                backgroundColor: BACKGROUND[background] ?? BACKGROUND.none,
                padding: '32px 24px',
            }}
        >
            {(title || description) && (
                <div style={{maxWidth: 1200, margin: '0 auto 24px'}}>
                    {title && (
                        <h2
                            style={{
                                margin: '0 0 12px',
                                fontSize: 28,
                                fontWeight: 700,
                                color: isBrand
                                    ? 'var(--g-color-text-brand-contrast)'
                                    : 'var(--g-color-text-primary)',
                            }}
                        >
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.6,
                                color: isBrand
                                    ? 'var(--g-color-text-brand-contrast)'
                                    : 'var(--g-color-text-secondary)',
                            }}
                        >
                            {description}
                        </p>
                    )}
                    {withDivider && <Divider style={{marginTop: 16}} />}
                </div>
            )}
            <div style={{maxWidth: 1200, margin: '0 auto'}}>
                <ChildrensWrap>
                    {React.Children.map(children, (child, index) => (
                        <ChildrenItemWrap index={index}>{child}</ChildrenItemWrap>
                    ))}
                </ChildrensWrap>
            </div>
        </div>
    );
};

export default SectionContainer;
