import {render, screen} from '@testing-library/react';
import React, {ElementType} from 'react';

import {QAProps} from '../../src/models/common';

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
        throw new Error('123');
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
        throw new Error('123');
    }

    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = screen.getByTestId(props.qa);

    expect(component).toHaveStyle(style);
};
