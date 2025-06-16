import * as React from 'react';

import {YandexForm} from '..';
import {
    FormsContext,
    HubspotFormsContextProps,
    YandexFormsContextProps,
} from '../../context/formsContext/FormsContext';
import {useTheme} from '../../context/theme';
import {FormBlockData, isHubspotDataForm, isYandexDataForm} from '../../models';
import {HubspotForm} from '../../sub-blocks';
import {getThemedValue} from '../../utils';

interface InnerFormProps {
    formData: FormBlockData;
    onContentLoad: () => void;
    className?: string;
}

const InnerForm = (props: InnerFormProps) => {
    const {formData, onContentLoad, className} = props;
    const formsConfig = React.useContext(FormsContext);
    const theme = useTheme();

    React.useEffect(() => {
        if (isHubspotDataForm(formData)) {
            onContentLoad();
        }
    }, [onContentLoad, formData]);

    if (isYandexDataForm(formData)) {
        const {onLoad, ...rest} = getThemedValue(formData.yandex, theme);

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
        const themedFormData = getThemedValue(formData.hubspot, theme);

        return (
            <HubspotForm
                createDOMElement={true}
                {...(formsConfig.hubspot as HubspotFormsContextProps | undefined)}
                {...themedFormData}
            />
        );
    }

    return null;
};

export default InnerForm;
