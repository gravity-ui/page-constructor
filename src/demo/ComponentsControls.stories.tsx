import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import BackLink, {BackLinkProps} from '../components/BackLink/BackLink';
import Button, {ButtonProps} from '../components/Button/Button';
import Control, {ControlProps} from '../components/Control/Control';
import FileLink from '../components/FileLink/FileLink';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs/HeaderBreadcrumbs';
import Link, {LinkFullProps} from '../components/Link/Link';
import ToggleArrow, {ToggleArrowProps} from '../components/ToggleArrow/ToggleArrow';
import {FileLinkProps, HeaderBreadCrumbsProps} from '../models';

import backLinkData from '../components/BackLink/__stories__/data.json';
import buttonData from '../components/Button/__stories__/data.json';
import controlData from '../components/Control/__stories__/data.json';
import fileLinkData from '../components/FileLink/__stories__/data.json';
import headerBreadcrumbsData from '../components/HeaderBreadcrumbs/__stories__/data.json';
import linkData from '../components/Link/__stories__/data.json';
import toggleArrowData from '../components/ToggleArrow/__stories__/data.json';

export default {title: 'Lab/Tokenization/Components/Controls'} as Meta;

const LINK_THEMES: LinkFullProps['theme'][] = ['normal', 'underline', 'back', 'file-link'];
const CONTROL_THEMES: ControlProps['theme'][] = ['primary', 'secondary', 'link', 'accent'];
const CONTROL_SIZES: ControlProps['size'][] = ['xs', 's', 'm', 'l'];
const FILE_EXTENSIONS = ['example.pdf', 'example.doc', 'example.xls', 'example.ppt', 'example.zip'];

export const Default: StoryFn = () => (
    <div style={{padding: '40px', display: 'flex', flexDirection: 'column', gap: '48px'}}>
        <section>
            <strong>Button — default</strong>
            <div style={{marginTop: '8px'}}>
                <Button {...buttonData.default} />
            </div>
        </section>
        <section>
            <strong>Button — width (max / auto)</strong>
            <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {(buttonData.width as ButtonProps[]).map((item, index) => (
                    <Button key={index} {...item} />
                ))}
            </div>
        </section>
        <section>
            <strong>Link — themes</strong>
            <div style={{marginTop: '8px', display: 'flex', gap: '24px', flexWrap: 'wrap'}}>
                {LINK_THEMES.map((theme) => (
                    <Link key={theme} text={`${theme}`} url="#" theme={theme} />
                ))}
            </div>
        </section>
        <section>
            <strong>Link — with arrow (s / m / l)</strong>
            <div style={{marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                {(linkData.normalArrows as LinkFullProps[]).map((item, index) => (
                    <Link key={index} {...item} />
                ))}
            </div>
        </section>
        <section>
            <strong>BackLink</strong>
            <div style={{marginTop: '8px'}}>
                <BackLink {...(backLinkData.default.content as BackLinkProps)} />
            </div>
        </section>
        <section>
            <strong>FileLink — default</strong>
            <div style={{marginTop: '8px'}}>
                <FileLink {...fileLinkData.default.content} />
            </div>
        </section>
        <section>
            <strong>FileLink — horizontal / vertical</strong>
            <div style={{marginTop: '8px', display: 'flex', gap: '24px'}}>
                <FileLink
                    {...(fileLinkData.typesThemes.content as FileLinkProps)}
                    type="horizontal"
                />
                <FileLink
                    {...(fileLinkData.typesThemes.content as FileLinkProps)}
                    type="vertical"
                />
            </div>
        </section>
        <section>
            <strong>FileLink — extensions</strong>
            <div style={{marginTop: '8px', display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
                {FILE_EXTENSIONS.map((href) => (
                    <FileLink key={href} href={href} text="Link to file" />
                ))}
            </div>
        </section>
        <section>
            <strong>Control — themes × sizes</strong>
            <div
                style={{
                    marginTop: '8px',
                    display: 'grid',
                    gridTemplateColumns: 'auto repeat(4, 40px)',
                    gap: '8px',
                    alignItems: 'center',
                }}
            >
                <span />
                {CONTROL_SIZES.map((size) => (
                    <span key={size} style={{fontSize: '12px', textAlign: 'center'}}>
                        {size}
                    </span>
                ))}
                {CONTROL_THEMES.map((theme) => (
                    <React.Fragment key={theme}>
                        <span style={{fontSize: '12px'}}>{theme}</span>
                        {CONTROL_SIZES.map((size) => (
                            <Control
                                key={`${theme}-${size}`}
                                {...(controlData.sizesThemes.content as ControlProps)}
                                theme={theme}
                                size={size}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </section>
        <section>
            <strong>ToggleArrow — closed / open</strong>
            <div style={{marginTop: '8px', display: 'flex', gap: '24px', alignItems: 'center'}}>
                <ToggleArrow {...(toggleArrowData.vertical.content as ToggleArrowProps)} />
                <ToggleArrow {...(toggleArrowData.vertical.content as ToggleArrowProps)} open />
                <ToggleArrow {...(toggleArrowData.horizontal.content as ToggleArrowProps)} />
                <ToggleArrow {...(toggleArrowData.horizontal.content as ToggleArrowProps)} open />
            </div>
        </section>
        <section>
            <strong>HeaderBreadcrumbs</strong>
            <div style={{marginTop: '8px'}}>
                <HeaderBreadcrumbs
                    {...(headerBreadcrumbsData.default.content as HeaderBreadCrumbsProps)}
                />
            </div>
        </section>
    </div>
);
