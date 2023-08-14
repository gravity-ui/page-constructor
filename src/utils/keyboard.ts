import React from 'react';

export const KEY = {
    ENTER: 'Enter',
    TAB: 'Tab',
};

export const clickOnEnter = <T extends HTMLElement>(event: React.KeyboardEvent<T>) => {
    if (event.key === KEY.ENTER) {
        event.currentTarget.click();
    }
};
