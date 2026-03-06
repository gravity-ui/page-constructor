import {Meta, StoryFn} from '@storybook/react';

import BalancedMasonry, {BalancedMasonryProps} from '../components/BalancedMasonry/BalancedMasonry';
import CardBase from '../components/CardBase/CardBase';
import ErrorWrapper from '../components/ErrorWrapper/ErrorWrapper';
import FullWidthBackground, {
    FullWidthBackgroundProps,
} from '../components/FullWidthBackground/FullWidthBackground';
import Table from '../components/Table/Table';
import UnpublishedLabel, {
    UnpublishedLabelProps,
} from '../components/UnpublishedLabel/UnpublishedLabel';
import {BREAKPOINTS} from '../constants';
import {TableProps} from '../models';

import balancedMasonryData from '../components/BalancedMasonry/__stories__/data.json';
import errorWrapperData from '../components/ErrorWrapper/__stories__/data.json';
import fullWidthBackgroundData from '../components/FullWidthBackground/__stories__/data.json';
import tableData from '../components/Table/__stories__/data.json';
import unpublishedLabelData from '../components/UnpublishedLabel/__stories__/data.json';

import './ComponentsLayout.stories.scss';

const masonryBreakpointCols: BalancedMasonryProps['breakpointCols'] = {
    [BREAKPOINTS.xs]: 1,
    [BREAKPOINTS.sm]: 2,
    [BREAKPOINTS.md]: 2,
    [BREAKPOINTS.lg]: 3,
    [BREAKPOINTS.xl]: 3,
};

export default {title: 'Lab/Tokenization/Components/Layout'} as Meta;

export const Default: StoryFn = () => (
    <div style={{padding: '40px', display: 'flex', flexDirection: 'column', gap: '48px'}}>
        <section>
            <strong>FullWidthBackground — default</strong>
            <div style={{marginTop: '8px', height: '100px'}}>
                <FullWidthBackground
                    {...(fullWidthBackgroundData.default as FullWidthBackgroundProps)}
                >
                    <div style={{padding: '40px', color: 'white'}}>Content</div>
                </FullWidthBackground>
            </div>
        </section>
        <section>
            <strong>FullWidthBackground — rounded</strong>
            <div style={{marginTop: '8px', height: '100px'}}>
                <FullWidthBackground
                    {...(fullWidthBackgroundData.rounded as FullWidthBackgroundProps)}
                >
                    <div style={{padding: '40px', color: 'white'}}>Content</div>
                </FullWidthBackground>
            </div>
        </section>
        <section>
            <strong>BalancedMasonry</strong>
            <div style={{marginTop: '8px'}}>
                <BalancedMasonry
                    className="demo-balanced-masonry"
                    columnClassName="demo-balanced-masonry-column"
                    breakpointCols={masonryBreakpointCols}
                >
                    {balancedMasonryData.default.content.children.map((text, index) => (
                        <CardBase key={index} className="demo-balanced-masonry-card">
                            <CardBase.Content>{text}</CardBase.Content>
                        </CardBase>
                    ))}
                </BalancedMasonry>
            </div>
        </section>
        <section>
            <strong>Table — default</strong>
            <Table {...(tableData.default.content as TableProps)} />
        </section>
        <section>
            <strong>Table — tick markers</strong>
            <Table {...(tableData.tick.content as TableProps)} />
        </section>
        <section>
            <strong>UnpublishedLabel (label)</strong>
            <div style={{marginTop: '8px'}}>
                <UnpublishedLabel
                    {...(unpublishedLabelData.label.content as UnpublishedLabelProps)}
                />
            </div>
        </section>
        <section>
            <strong>UnpublishedLabel (line)</strong>
            <div style={{marginTop: '8px'}}>
                <UnpublishedLabel
                    {...(unpublishedLabelData.line.content as UnpublishedLabelProps)}
                />
            </div>
        </section>
        <section>
            <strong>ErrorWrapper (error state)</strong>
            <div style={{marginTop: '8px'}}>
                <ErrorWrapper {...errorWrapperData.default.content} handler={() => {}}>
                    {errorWrapperData.default.content.children}
                </ErrorWrapper>
            </div>
        </section>
        <section>
            <strong>ErrorWrapper (no error)</strong>
            <div style={{marginTop: '8px'}}>
                <ErrorWrapper {...errorWrapperData.noError.content} handler={() => {}}>
                    {errorWrapperData.noError.content.children}
                </ErrorWrapper>
            </div>
        </section>
    </div>
);
