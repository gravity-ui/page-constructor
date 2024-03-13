import React from 'react';

import {YandexFormProps} from '../../models/constructor-items/common';
import {HubspotFormProps} from '../../models/constructor-items/sub-blocks';

export const DEFAULT_FORMS_CONTEXT_VALUE: FormsContextProps = {};

export interface FormsContextProps {
    yandex?: YandexFormsContextProps;
    hubspot?: HubspotFormsContextProps;
}

export interface YandexFormsContextProps
    extends Partial<Pick<YandexFormProps, 'customFormOrigin'>> {}

export interface HubspotFormsContextProps
    extends Partial<Pick<HubspotFormProps, 'createDOMElement'>> {}

export const FormsContext = React.createContext<FormsContextProps>(DEFAULT_FORMS_CONTEXT_VALUE);
