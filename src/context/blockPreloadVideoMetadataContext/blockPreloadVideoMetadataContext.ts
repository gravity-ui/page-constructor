// ISSUE-853 https://github.com/gravity-ui/page-constructor/issues/853
// temporal solution for Safari 17

import React from 'react';

export const BlockPreloadVideoMetadataContext = React.createContext<boolean>(false);
