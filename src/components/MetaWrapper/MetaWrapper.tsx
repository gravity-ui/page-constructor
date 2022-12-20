import React from 'react';
import {Helmet} from 'react-helmet';

import {MetaProps} from '../../models/common';

/**
 * Wrapper on meta data of page
 *
 * @param needHelmetWrapper - component needs helmet wrapper
 * @param metaComponent - meta data component
 *
 * @returns jsx
 */
export const MetaWrapper = ({needHelmetWrapper = false, metaComponent}: MetaProps) =>
    needHelmetWrapper ? <Helmet>{metaComponent}</Helmet> : metaComponent;
