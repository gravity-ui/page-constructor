import {render, screen} from '@testing-library/react';
import pick from 'lodash/pick';

import {getColClass} from '../../src';
import {QAProps} from '../../src/models/common';
import Content, {ContentProps} from '../../src/sub-blocks/Content/Content';
import {getQaAttrubutes} from '../../src/utils/blocks';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

export type ContentTestFunction = {
    props: ContentProps & QAProps;
    options?: {qaId?: string};
};

export const testContentByDefault = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...props} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toBeInTheDocument();
    expect(container).toBeVisible();
    expect(container).toHaveClass('col-12');
    expect(container).toHaveClass('col-sm-8');
};

export const testContentWithTitle = ({props}: ContentTestFunction) => {
    render(<Content {...pick(props, 'title')} />);
    const title = screen.getByText(props.title as string);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
};

export const testContentWithText = ({props}: ContentTestFunction) => {
    render(<Content {...pick(props, 'text')} />);
    const text = screen.getByText(props.text as string);
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
};

export const testContentWithAdditionalInfo = ({props}: ContentTestFunction) => {
    render(<Content {...pick(props, 'additionalInfo')} />);
    const additionalInfo = screen.getByText(props.additionalInfo as string);
    expect(additionalInfo).toBeInTheDocument();
    expect(additionalInfo).toBeVisible();
};

export const testContentWithSize = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...pick(props, 'size', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content pc-content_size_${props.size}`);
};

export const testContentWithLinks = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props?.links?.[0]?.url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...pick(props, 'links', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.links[0].url);
};

export const testContentWithButtons = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props?.buttons?.[0]?.url) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...pick(props, 'buttons', 'qa')} />);
    const link = screen.getByTestId(options.qaId);
    expect(link).toHaveAttribute('href', props.buttons[0].url);
};

export const testContentWithColSize = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props?.colSizes) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const [, , all, lg, md, sm] = getColClass({sizes: props.colSizes}).split(' ');
    render(<Content {...pick(props, 'colSizes', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(all);
    expect(container).toHaveClass(lg);
    expect(container).toHaveClass(md);
    expect(container).toHaveClass(sm);
};

export const testContentWithCentered = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props?.centered) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...pick(props, 'centered', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass('pc-content_centered');
};

export const testContentWithTheme = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props?.theme) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    render(<Content {...pick(props, 'theme', 'qa')} />);
    const container = screen.getByTestId(options.qaId);
    expect(container).toHaveClass(`pc-content_theme_${props.theme}`);
};

export const testContentWithList = ({props, options}: ContentTestFunction) => {
    if (
        !options?.qaId ||
        !props.list?.[0]?.icon ||
        !props.list?.[0]?.title ||
        !props.list?.[0]?.text
    ) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const listQa = getQaAttrubutes(options.qaId, ['title', 'text']);

    render(<Content {...pick(props, 'list', 'qa')} />);
    const image = screen.getByRole('img');
    const title = screen.getByTestId(listQa.title);
    const text = screen.getByTestId(listQa.text);
    expect(image).toHaveAttribute('src', props.list?.[0]?.icon);
    expect(title).toHaveTextContent(props.list?.[0]?.title);
    expect(text).toHaveTextContent(props.list?.[0]?.text);
};

export const testContentWithLabels = ({props, options}: ContentTestFunction) => {
    if (!options?.qaId || !props.labels?.[0]?.icon || !props.labels?.[0]?.text) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const labelsQa = getQaAttrubutes(options.qaId, ['text']);

    render(<Content {...pick(props, 'labels', 'qa')} />);
    const image = screen.getByRole('img');
    const text = screen.getByTestId(labelsQa.text);
    expect(image).toHaveAttribute('src', props.labels?.[0]?.icon);
    expect(text).toHaveTextContent(props.labels?.[0]?.text);
};
