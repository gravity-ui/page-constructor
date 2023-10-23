import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';

import {Media, Title, YandexForm} from '../../components';
import {MobileContext} from '../../context/mobileContext';
import {Col, Grid, GridAlignItems, GridColumnSize, Row} from '../../grid';
import type {FormBlockProps} from '../../models';
import {
    FormBlockDataTypes,
    FormBlockDirection,
    isHubspotDataForm,
    isYandexDataForm,
} from '../../models';
import {Content, HubspotForm} from '../../sub-blocks';
import {block} from '../../utils';

import './Form.scss';

const b = block('form-block');

const FormBlock: React.FC<FormBlockProps> = (props) => {
    const {
        formData,
        title,
        textContent,
        image,
        direction = FormBlockDirection.Center,
        backgroundColor,
    } = props;
    const [contentLoaded, setContentLoaded] = useState(false);
    const isMobile = useContext(MobileContext);

    const withBackground = Boolean(backgroundColor) || Boolean(image);
    const colSizes = {[GridColumnSize.Lg]: 6, [GridColumnSize.All]: 12};
    const paddingBottom = Boolean(backgroundColor) && !image ? 'l' : 'm';
    const onContentLoad = useCallback(() => {
        setContentLoaded(true);
    }, []);

    const formType = useMemo(() => {
        if (isYandexDataForm(formData)) return FormBlockDataTypes.YANDEX;
        if (isHubspotDataForm(formData)) return FormBlockDataTypes.HUBSPOT_INLINE;
        return undefined;
    }, [formData]);

    useEffect(() => {
        if (formType === FormBlockDataTypes.HUBSPOT_INLINE) {
            onContentLoad();
        }
    }, [formType, onContentLoad]);

    const renderForm = useCallback(() => {
        if (isYandexDataForm(formData)) {
            const {onLoad, className, ...rest} = formData.yandex;
            return (
                <YandexForm
                    {...rest}
                    onLoad={() => {
                        onContentLoad();
                        onLoad?.();
                    }}
                    className={b('form', className)}
                />
            );
        }

        if (isHubspotDataForm(formData)) {
            return <HubspotForm {...formData.hubspot} />;
        }

        return null;
    }, [formData, onContentLoad]);

    if (!formData) {
        return null;
    }

    return (
        <div
            className={b({
                'with-background': withBackground,
                'form-type': formType,
            })}
        >
            {withBackground && (
                <Media
                    image={image}
                    color={backgroundColor}
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
                                    'without-title': !textContent,
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
                                {renderForm()}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default FormBlock;
