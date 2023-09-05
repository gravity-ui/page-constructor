import {render, screen} from '@testing-library/react';
import React, {ElementType} from 'react';

import {QAProps} from '../../src/models/common';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

export const testCustomClassName = <T,>({
    component: Component,
    props,
    options,
}: {
    component: ElementType;
    props: T & QAProps;
    options?: {qaId?: string};
}) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const className = 'custom-class-name';
    render(<Component className={className} {...props} />);
    const anchor = screen.getByTestId(options?.qaId || props.qa);
    expect(anchor).toHaveClass(className);
};

export const testCustomStyle = <T,>({
    component: Component,
    props,
}: {
    component: ElementType;
    props: T & QAProps;
}) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = screen.getByTestId(props.qa);

    expect(component).toHaveStyle(style);
};
