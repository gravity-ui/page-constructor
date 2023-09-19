import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, {ElementType} from 'react';

import {QAProps} from '../../src/models/common';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

type CommonTestArgs<T> = {
    component: ElementType;
    props: T & QAProps;
    options?: {qaId?: string};
};

export const testCustomClassName = <T,>({
    component: Component,
    props,
    options,
}: CommonTestArgs<T>) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const className = 'custom-class-name';
    render(<Component {...props} className={className} />);
    const anchor = screen.getByTestId(options?.qaId || props.qa);
    expect(anchor).toHaveClass(className);
};

export const testCustomStyle = <T,>({component: Component, props}: CommonTestArgs<T>) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = screen.getByTestId(props.qa);

    expect(component).toHaveStyle(style);
};

export const testAnimated = async <T,>({
    component: Component,
    props,
    options,
}: CommonTestArgs<T>) => {
    if (!options?.qaId) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const user = userEvent.setup();
    render(<Component animated {...props} />);
    const component = screen.getByTestId(options?.qaId);
    await user.hover(component);

    expect(component).toHaveClass('animate');
};
