import {render, screen} from '@testing-library/react';
import {pick} from 'lodash';
import React, {ElementType} from 'react';

import {GridColumnSizesType} from '../../src/grid/types';
import {QAProps} from '../../src/models/common';
import {ContentProps} from '../../src/sub-blocks/Content/Content';
import {getCommonQa} from '../../src/utils/blocks';

const ERROR_MESSAGE = 'There are errors in input test data';

export type ContentTestFunction = {
    component: ElementType;
    props: ContentProps & QAProps;
    options: {qaId?: string};
};

const getColSizesClassName = (colSizes: GridColumnSizesType) => {
    const sizeEntries = Object.entries(colSizes);

    return sizeEntries.reduce((acc, [key, value]) => {
        const prefix = 'col-';
        const suffix = key === 'all' ? value.toString() : `${key}-${value}`;

        // eslint-disable-next-line no-param-reassign
        acc[key] = prefix + suffix;

        return acc;
    }, {} as Record<string, string>);
};

export const testContentByDefault = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options.qaId) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...props} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toBeInTheDocument();
    expect(container).toBeVisible();
    expect(container).toHaveClass('col-12');
    expect(container).toHaveClass('col-sm-8');
};

export const testContentWithTitle = ({component: Component, props}: ContentTestFunction) => {
    render(<Component {...pick(props, 'title')} />);
    const title = screen.getByText(props.title as string);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
};

export const testContentWithText = ({component: Component, props}: ContentTestFunction) => {
    render(<Component {...pick(props, 'text')} />);
    const text = screen.getByText(props.text as string);
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
};

export const testContentWithAdditionalInfo = ({
    component: Component,
    props,
}: ContentTestFunction) => {
    render(<Component {...pick(props, 'additionalInfo')} />);
    const additionalInfo = screen.getByText(props.additionalInfo as string);
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toBeVisible();
};

export const testContentWithSize = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options.qaId) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...pick(props, 'size', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content pc-content_size_${props.size}`);
};

export const testContentWithLinks = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options?.qaId || !props?.links?.[0]?.url) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...pick(props, 'links', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.links[0].url);
};

export const testContentWithButtons = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options?.qaId || !props?.buttons?.[0]?.url) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...pick(props, 'buttons', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.buttons[0].url);
};

export const testContentWithColSize = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options?.qaId || !props?.colSizes) {
        throw new Error(ERROR_MESSAGE);
    }

    const colSizeClasses = getColSizesClassName(props.colSizes);

    render(<Component {...pick(props, 'colSizes', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(colSizeClasses.all);
    expect(container).toHaveClass(colSizeClasses.lg);
    expect(container).toHaveClass(colSizeClasses.md);
    expect(container).toHaveClass(colSizeClasses.sm);
};

export const testContentWithCentered = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options?.qaId || !props?.centered) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...pick(props, 'centered', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass('pc-content_centered');
};

export const testContentWithTheme = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (!options?.qaId || !props?.theme) {
        throw new Error(ERROR_MESSAGE);
    }

    render(<Component {...pick(props, 'theme', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content_theme_${props.theme}`);
};

export const testContentWithList = ({
    component: Component,
    props,
    options,
}: ContentTestFunction) => {
    if (
        !options?.qaId ||
        !props.list?.[0]?.icon ||
        !props.list?.[0]?.title ||
        !props.list?.[0]?.text
    ) {
        throw new Error(ERROR_MESSAGE);
    }

    const listQa = getCommonQa(options.qaId, ['title', 'text']);

    render(<Component {...pick(props, 'list', 'qa')} />);
    const image = screen.getByRole('img');
    const title = screen.getByTestId(listQa.title);
    const text = screen.getByTestId(listQa.text);
    expect(image).toHaveAttribute('src', props.list?.[0]?.icon);
    expect(title).toHaveTextContent(props.list?.[0]?.title);
    expect(text).toHaveTextContent(props.list?.[0]?.text);
};
