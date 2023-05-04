import React, {ElementType} from 'react';

import {render, screen} from '@testing-library/react';

type QA = {
    qa: string;
};

export const testCustomClassName = <T,>({
    component: Component,
    props,
}: {
    component: ElementType;
    props: T & QA;
}) => {
    const className = 'custom-class-name';
    render(<Component className={className} {...props} />);
    const anchor = screen.getByTestId(props.qa);
    expect(anchor).toHaveClass(className);
};

export const testCustomStyle = <T,>({
    component: Component,
    props,
}: {
    component: ElementType;
    props: T & QA;
}) => {
    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = screen.getByTestId(props.qa);

    expect(component).toHaveStyle(style);
};
