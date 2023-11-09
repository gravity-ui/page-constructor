import React, {useCallback, useContext, useState} from 'react';

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

    const withBackground = Boolean(
        background && (background.src || background.desktop || background.style?.backgroundColor),
    );
    const onContentLoad = useCallback(() => {
        setContentLoaded(true);
    }, []);

    if (!formData) {
        return null;
    }

    let formType;

    if (isYandexDataForm(formData)) {
        formType = FormBlockDataTypes.YANDEX;
    } else if (isHubspotDataForm(formData)) {
        formType = FormBlockDataTypes.HUBSPOT;
    }

    return (
        <div
            className={b({
                'with-background': withBackground,
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
