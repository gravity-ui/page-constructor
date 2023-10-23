import React from 'react';

import useMount from '../../hooks/useMount';
import type {HubspotFormProps} from '../../models';
import {HubspotForm} from '../../sub-blocks';

type Props = HubspotFormProps & {
    onReady?: () => void;
};

const HubspotInlineForm: React.FC<Props> = (props) => {
    const {onReady, ...rest} = props;

    useMount(() => {
        onReady?.();
    });

    return <HubspotForm {...rest} createDOMElement={true} />;
};

export default HubspotInlineForm;
