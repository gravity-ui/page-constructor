import React, {useEffect} from 'react';

import {YandexForm} from '../../../components';
import {FormBlockData, isHubspotDataForm, isYandexDataForm} from '../../../models';
import {HubspotForm} from '../../../sub-blocks';

interface InnerFormProps {
    formData: FormBlockData;
    onContentLoad: () => void;
    className?: string;
}

const InnerForm: React.FC<InnerFormProps> = (props) => {
    const {formData, onContentLoad, className} = props;

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
        return <HubspotForm {...formData.hubspot} />;
    }

    return null;
};

export default InnerForm;
