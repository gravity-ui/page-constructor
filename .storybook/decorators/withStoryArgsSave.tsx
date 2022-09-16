import React from 'react';
import type {DecoratorFn} from '@storybook/react';

export const withStoryArgsSave: DecoratorFn = (Story, context) => {
    const { args, parameters } = context;

    const id = parameters.__id;
    const result = {
        fileName: parameters?.fileName,
        ...args,
    }

    localStorage.setItem(id, JSON.stringify(result));

    return <Story {...context} />;
};
