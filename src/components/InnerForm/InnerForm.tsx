import React, {useContext, useEffect} from 'react';

import {YandexForm} from '..';
import {
    FormsContext,
    HubspotFormsContextProps,
    YandexFormsContextProps,
} from '../../context/formsContext/FormsContext';
import {FormBlockData, isHubspotDataForm, isYandexDataForm} from '../../models';
import {HubspotForm} from '../../sub-blocks';

interface InnerFormProps {
    formData: FormBlockData;
    onContentLoad: () => void;
    className?: string;
}

const InnerForm: React.FC<InnerFormProps> = (props) => {
    const {formData, onContentLoad, className} = props;
    const formsConfig = useContext(FormsContext);

    useEffect(() => {
        if (isHubspotDataForm(formData)) {
            onContentLoad();
        }
    }, [onContentLoad, formData]);

    if (isYandexDataForm(formData)) {
        const {onLoad, ...rest} = formData.yandex;

        return (
            <div className={className}>
                <YandexForm
                    {...(formsConfig.yandex as YandexFormsContextProps | undefined)}
                    {...rest}
                    onLoad={() => {
                        onContentLoad();
                        onLoad?.();
                    }}
                />
            </div>
        );
    }

    if (isHubspotDataForm(formData)) {
        return (
            <HubspotForm
                createDOMElement={true}
                {...(formsConfig.hubspot as HubspotFormsContextProps | undefined)}
                {...formData.hubspot}
            />
        );
    }

    return null;
};

export default InnerForm;
