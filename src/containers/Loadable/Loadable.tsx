import React, {useState, useEffect, useCallback} from 'react';
import {Spin} from '@yandex-data-ui/common';
import blockCn from 'bem-cn-lite';

import {Block, FetchLoadableData, LoadableData} from '../../models';
import ErrorWrapper from '../../components/ErrorWrapper/ErrorWrapper';
import i18n from './i18n';

import './Loadable.scss';

const b = blockCn('loadable-block');

export interface LoadableState {
    loading: boolean;
    error: boolean;
    data?: LoadableData;
}

interface LoadableComponentsProps {
    Component: React.ComponentType;
    ChildComponent: React.ComponentType;
    block: Block;
    blockKey: string;
    fetch: FetchLoadableData;
    serviceId?: number;
}

const initData = {
    loading: false,
    error: false,
};

const Loadable: React.FC<LoadableComponentsProps> = (props) => {
    const {Component, ChildComponent, fetch, block, blockKey, serviceId} = props;
    const [dataState, setDataState] = useState<LoadableState>(initData);
    const [refetchIndex, setRefetchIndex] = useState<number>(0);
    const onTryAgain = useCallback(() => {
        setRefetchIndex(refetchIndex + 1);
    }, [refetchIndex]);

    useEffect(() => {
        async function processData() {
            setDataState({loading: true, error: false});

            let data, error;

            try {
                data = await fetch({blockKey, serviceId});
                error = false;

                setDataState({data, loading: false, error});
            } catch (ex) {
                error = true;
                setDataState({loading: false, error});
            }
        }

        processData();
    }, [refetchIndex, fetch, blockKey, serviceId]);

    const {error, loading, data} = dataState;

    if (loading) {
        return (
            <div className={b('loader')}>
                <Spin size="xl" />
            </div>
        );
    }

    return (
        <ErrorWrapper
            isError={error}
            text={i18n('loadable-load-error')}
            buttonText={i18n('loadable-try-again')}
            handler={onTryAgain}
        >
            <Component {...block}>
                {data &&
                    (Array.isArray(data) ? (
                        data.map((componentData: LoadableData, index: number) => (
                            <ChildComponent key={componentData.id || index} {...componentData} />
                        ))
                    ) : (
                        <ChildComponent {...data} />
                    ))}
            </Component>
        </ErrorWrapper>
    );
};

export default Loadable;
