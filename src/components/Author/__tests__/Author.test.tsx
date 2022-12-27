import React from 'react';
import {render, screen} from '@testing-library/react';

import {AuthorType} from '../../../models';
import Author from '../Author';

const testId = 'aut-hor';

const author = {
    firstName: 'John',
    secondName: 'Doe',
    description: 'Web designer',
    avatar: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/storybook/images/img-gray.png',
};

describe('Author', () => {
    test('Render author by default', async () => {
        render(<Author author={author} dataQa={testId} />);
        const object = screen.getByTestId(testId);
        expect(object).toBeInTheDocument();
    });

    test('Has full name', async () => {
        const name = `${author.firstName} ${author.secondName}`;
        render(<Author author={author} dataQa={testId} />);
        const object = screen.getByText(name);
        expect(object).toBeInTheDocument();
    });

    test('Has first name only', async () => {
        const name = author.firstName;
        render(<Author author={{...author, secondName: ''}} dataQa={testId} />);
        const object = screen.getByText(name);
        expect(object).toBeInTheDocument();
    });

    test('Has avatar', async () => {
        render(<Author author={author} dataQa={testId} />);
        const avatar = screen.getByRole('img');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', author.avatar);
    });

    test('Has description', async () => {
        render(<Author author={author} dataQa={testId} />);
        const object = screen.getByText(author.description);
        expect(object).toBeInTheDocument();
    });

    test.each(new Array<AuthorType>(AuthorType.Column, AuthorType.Line))(
        'render with given "%s" type',
        (type) => {
            render(<Author author={author} dataQa={testId} type={type} />);
            const object = screen.getByTestId(testId);
            expect(object).toHaveClass(`pc-author_type_${type}`);
        },
    );
});
