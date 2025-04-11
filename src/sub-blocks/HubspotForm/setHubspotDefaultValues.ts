import {HubspotFormDefaultValues} from '../../utils/hubspot';

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
/* eslint-disable no-param-reassign */

type HubspotInputValue = HubspotFormDefaultValues[string];

const setInputValue = (inputs: HTMLInputElement[], value: HubspotInputValue) => {
    const input = inputs[0];
    const type = input.type;

    switch (type) {
        case 'checkbox':
            input.checked = Boolean(value);
            return;
        case 'radio':
            inputs.forEach((radio) => {
                if (radio.value === String(value)) {
                    input.checked = true;
                }
            });
            return;
        default:
            input.value = String(value);
    }
};

const setSelectValue = (select: HTMLSelectElement, value: HubspotInputValue) => {
    const options = Array.from(select.querySelectorAll('option'));

    options.forEach((option) => {
        if (option.value === String(value)) {
            option.selected = true;
        }
    });
};

const setValue = (elements: Element[], value: HubspotInputValue) => {
    const element = elements[0];

    switch (element.tagName.toLowerCase()) {
        case 'input':
            setInputValue(elements as HTMLInputElement[], value);
            return;
        case 'textarea':
            (element as HTMLTextAreaElement).value = String(value);
            return;
        case 'select':
            setSelectValue(element as HTMLSelectElement, value);
            return;
    }
};

export const setHubspotDefaultValues = (
    form: HTMLFormElement,
    defaultValues: HubspotFormDefaultValues,
) => {
    Object.entries(defaultValues).forEach(([name, value]) => {
        const inputs = Array.from(form.querySelectorAll(`[name="${name}"]`));
        setValue(inputs, value);
    });
};
