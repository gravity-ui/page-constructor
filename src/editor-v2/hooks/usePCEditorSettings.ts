import * as React from 'react';

import {IframeContext} from '../context/iframeContext';

export const usePCEditorSettings = () => {
    const {url, setUrl} = React.useContext(IframeContext);
    return {currentUrl: url, changeUrl: setUrl};
};
