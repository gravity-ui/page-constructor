import React, {useState, useEffect, useCallback} from 'react';
import {Spin} from '@yandex-data-ui/common';
import blockCn from 'bem-cn-lite';

import {Block, FetchLoadableData} from '../../models';
import ErrorWrapper from '../../components/ErrorWrapper/ErrorWrapper';

import './Loadable.scss';

const b = blockCn('loadable-block');

//TODO type CLOUDFRONT-8475
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoadableData = any;

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
}

const initData = {
    loading: false,
    error: false,
};

const Loadable: React.FC<LoadableComponentsProps> = (props) => {
    const {Component, ChildComponent, fetch, block, i18nK, blockKey} = props;
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
                data = await fetch(blockKey);
                error = false;

                setDataState({data, loading: false, error});
            } catch (ex) {
                error = true;
                setDataState({loading: false, error});
            }
        }

        processData();
    }, [refetchIndex, fetch, blockKey]);

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
            text={i18nK('loadable-load-error')}
            buttonText={i18nK('loadable-try-again')}
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
