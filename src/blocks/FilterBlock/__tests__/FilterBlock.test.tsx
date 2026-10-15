import {fireEvent, render, screen} from '@testing-library/react';

import {WindowWidthContext} from '../../../context/windowWidthContext';
import {FilterBlockProps, SubBlockType} from '../../../models';
import FilterBlock from '../FilterBlock';

jest.mock('../../../containers/PageConstructor/components/ConstructorItem', () => ({
    ConstructorItem: ({data}: {data: {title: string}}) => <div>{data.title}</div>,
}));

const props: FilterBlockProps = {
    tags: [
        {id: 'one', label: 'One', collapsible: true},
        {id: 'two', label: 'Two'},
    ],
    items: Array.from({length: 10}, (_, index) => ({
        tags: ['one', 'two'],
        card: {type: SubBlockType.BasicCard, url: '/', title: `Card ${index}`},
    })),
    colSizes: {all: 12, md: 6, lg: 4},
    visibleRowsCount: {all: 3, md: 2, lg: 1},
    expandButtonText: 'Expand',
    collapseButtonText: 'Collapse',
};

const renderBlock = (params = props, width = 1200) =>
    render(
        <WindowWidthContext.Provider value={width}>
            <FilterBlock {...params} />
        </WindowWidthContext.Provider>,
    );

it.each([
    [375, 3],
    [768, 3],
    [769, 4],
    [1080, 4],
    [1081, 3],
])('shows complete rows at width %s', (width, count) => {
    renderBlock(props, width);
    expect(screen.getAllByText(/^Card /)).toHaveLength(count);
});

it('expands, collapses and resets when changing tabs', () => {
    renderBlock();
    fireEvent.click(screen.getByRole('button', {name: 'Expand'}));
    expect(screen.getAllByText(/^Card /)).toHaveLength(10);
    expect(screen.getByRole('button', {name: 'Collapse'})).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', {name: 'Collapse'}));
    expect(screen.getAllByText(/^Card /)).toHaveLength(3);
    fireEvent.click(screen.getByRole('button', {name: 'Expand'}));
    fireEvent.click(screen.getByText('Two'));
    expect(screen.getAllByText(/^Card /)).toHaveLength(10);
    expect(screen.queryByRole('button', {name: 'Collapse'})).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('One'));
    expect(screen.getAllByText(/^Card /)).toHaveLength(3);
});

it('supports the all tab independently', () => {
    renderBlock({...props, allTag: {id: 'all', label: 'All', collapsible: true}});
    expect(screen.getAllByText(/^Card /)).toHaveLength(3);
});

it.each([
    {...props, visibleRowsCount: undefined},
    {...props, tags: [{id: 'one', label: 'One'}]},
    {...props, items: props.items.slice(0, 3)},
])('does not show a toggle without overflow or opt-in', (params) => {
    renderBlock(params);
    expect(screen.getAllByText(/^Card /)).toHaveLength(params.items.length);
    expect(screen.queryByRole('button', {name: 'Expand'})).not.toBeInTheDocument();
});

it('recalculates on resize with inherited breakpoint values', () => {
    const params = {...props, visibleRowsCount: {all: 1}};
    const {rerender} = renderBlock(params);
    expect(screen.getAllByText(/^Card /)).toHaveLength(3);
    rerender(
        <WindowWidthContext.Provider value={800}>
            <FilterBlock {...params} />
        </WindowWidthContext.Provider>,
    );
    expect(screen.getAllByText(/^Card /)).toHaveLength(2);
});
