import * as React from 'react';

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {QAProps} from '../../src/models/common';
import {ERROR_INPUT_DATA_MESSAGE} from '../constants';

type CommonTestArgs<T> = {
    component: React.ElementType;
    props: T & QAProps;
    options?: {qaId?: string; customClassNameProp?: string; role?: string};
};

const validateInputProps = <T,>(props: CommonTestArgs<T>['props']) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }
};

const getComponent = <T,>({props, options}: Omit<CommonTestArgs<T>, 'component'>) => {
    if (!props.qa) {
        throw new Error(ERROR_INPUT_DATA_MESSAGE);
    }

    return options?.role
        ? screen.getByRole(options.role)
        : screen.getByTestId(options?.qaId || props.qa);
};

export const testCustomClassName = <T,>({
    component: Component,
    props,
    options,
}: CommonTestArgs<T>) => {
    validateInputProps(props);

    const className = 'custom-class-name';
    const classNameProps = {
        [options?.customClassNameProp || 'className']: className,
    };
    render(<Component {...props} {...classNameProps} />);
    const component = getComponent({props, options});

    expect(component).toHaveClass(className);
};

export const testCustomStyle = <T,>({component: Component, props, options}: CommonTestArgs<T>) => {
    validateInputProps(props);

    const style = {color: 'red'};

    render(<Component {...props} style={style} />);
    const component = getComponent({props, options});

    expect(component).toHaveStyle(style);
};

export const testAnimated = async <T,>({
    component: Component,
    props,
    options,
}: CommonTestArgs<T>) => {
    validateInputProps(props);

    const user = userEvent.setup();
    render(<Component animated {...props} />);
    const component = getComponent({props, options});

    await user.hover(component);

    expect(component).toHaveClass('animate');
};

export const testOnClick = async <T,>({
    component: Component,
    props,
    options,
}: CommonTestArgs<T>) => {
    validateInputProps(props);

    const user = userEvent.setup();
    const handleOnClick = jest.fn();
    render(<Component {...props} onClick={handleOnClick} />);

    const component = getComponent({props, options});

    await user.click(component);
    expect(handleOnClick).toHaveBeenCalledTimes(1);
};
