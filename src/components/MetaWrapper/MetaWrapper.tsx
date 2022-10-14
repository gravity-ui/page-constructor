import React from 'react';
import {Helmet} from 'react-helmet';

import {BlogPageMetaProps} from '../../models/blog';

/**
 * Wrapper on meta data of page
 *
 * @param needHelmetWrapper - component needs helmet wrapper
 * @param metaComponent - meta data component
 *
 * @returns jsx
 */
export const MetaWrapper = ({needHelmetWrapper = false, metaComponent}: BlogPageMetaProps) =>
    needHelmetWrapper ? <Helmet>{metaComponent}</Helmet> : metaComponent;
