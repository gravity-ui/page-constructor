import Ajv from 'ajv';

import {FilterProps} from '../schema';

const validate = new Ajv().compile(FilterProps.properties.visibleRowsCount);

describe('FilterBlock visibleRowsCount schema', () => {
    it.each(['all', 'sm', 'md', 'lg', 'xl'])('accepts positive row counts for %s', (size) => {
        expect(validate({[size]: 1})).toBe(true);
        expect(validate({[size]: 20})).toBe(true);
    });

    it.each([0, -1, 1.5, '2', null])('rejects invalid row count %s', (value) => {
        for (const size of ['all', 'sm', 'md', 'lg', 'xl']) {
            expect(validate({[size]: value})).toBe(false);
        }
    });

    it('accepts sparse and empty breakpoint configurations', () => {
        expect(validate({all: 3, lg: 2})).toBe(true);
        expect(validate({})).toBe(true);
    });

    it('rejects unknown breakpoints', () => {
        expect(validate({xxl: 2})).toBe(false);
    });
});
