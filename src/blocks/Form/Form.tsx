import React, {useCallback, useContext, useMemo, useState} from 'react';

import {BackgroundImage, Title} from '../../components';
import {MobileContext} from '../../context/mobileContext';
import {Col, Grid, GridAlignItems, GridColumnSize, Row} from '../../grid';
import type {FormBlockProps} from '../../models';
import {
    FormBlockDataTypes,
    FormBlockDirection,
    isHubspotDataForm,
    isYandexDataForm,
} from '../../models';
import {Content} from '../../sub-blocks';
import {block} from '../../utils';

import InnerForm from './InnerForm/InnerForm';

import './Form.scss';

const b = block('form-block');

const colSizes = {[GridColumnSize.Lg]: 6, [GridColumnSize.All]: 12};

const FormBlock: React.FC<FormBlockProps> = (props) => {
    const {formData, title, textContent, direction = FormBlockDirection.Center, background} = props;
    const [contentLoaded, setContentLoaded] = useState(false);
    const isMobile = useContext(MobileContext);

    const hasImage = background && (background.src || background.desktop);
    const paddingBottom = background && background.style?.backgroundColor && !hasImage ? 'l' : 'm'; // bigger padding for case with background color and no image
    const onContentLoad = useCallback(() => {
        setContentLoaded(true);
    }, []);

    const formType = useMemo(() => {
        if (isYandexDataForm(formData)) return FormBlockDataTypes.YANDEX;
        if (isHubspotDataForm(formData)) return FormBlockDataTypes.HUBSPOT_INLINE;
        return undefined;
    }, [formData]);

    if (!formData) {
        return null;
    }

    return (
        <div
            className={b({
                'with-background': Boolean(background),
                'form-type': formType,
            })}
        >
            {background && (
                <BackgroundImage
                    {...background}
                    className={b('media')}
                    imageClassName={b('image')}
                />
            )}
            <Grid>
                <Row
                    alignItems={
                        direction === FormBlockDirection.Center
                            ? GridAlignItems.Center
                            : GridAlignItems.Start
                    }
                    className={b('row', {
                        direction,
                        'padding-bottom': paddingBottom,
                    })}
                >
                    <Col sizes={colSizes} className={b('content-col')}>
                        {textContent && (
                            <div className={b('content-wrapper')}>
                                <Content
                                    theme="default"
                                    {...textContent}
                                    centered={direction === FormBlockDirection.Center}
                                    colSizes={{all: 12}}
                                    className={b('content')}
                                />
                            </div>
                        )}
                    </Col>
                    <Col sizes={colSizes} className={b('form-col')}>
                        <div className={b('form-wrapper')}>
                            <div
                                className={b('full-form', {
                                    hidden: !contentLoaded,
                                })}
                            >
                                {title && (
                                    <Title
                                        title={{
                                            text: title,
                                            textSize: 's',
                                        }}
                                        className={b('title', {mobile: isMobile})}
                                        colSizes={{all: 12}}
                                    />
                                )}
                                <InnerForm
                                    className={b('form')}
                                    formData={formData}
                                    onContentLoad={onContentLoad}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default FormBlock;
