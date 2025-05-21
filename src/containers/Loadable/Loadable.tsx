import * as React from 'react';

import {Spin} from '@gravity-ui/uikit';

import ErrorWrapper from '../../components/ErrorWrapper/ErrorWrapper';
import {
    ConstructorBlock,
    CustomItem,
    FetchLoadableData,
    LoadableData,
    LoadableProps,
} from '../../models';
import {block as blockCn} from '../../utils/cn';

import {i18n} from './i18n';

import './Loadable.scss';

const b = blockCn('loadable-block');

export interface LoadableState {
    loading: boolean;
    error: boolean;
    data?: LoadableData;
}

export interface LoadableComponentsProps
    extends Omit<React.PropsWithChildren<LoadableProps>, 'source'> {
    Component: CustomItem;
    ChildComponent: CustomItem;
    block: ConstructorBlock;
    blockKey: string;
    fetch: FetchLoadableData;
}

const initData = {
    loading: false,
    error: false,
};

const Loadable = (props: LoadableComponentsProps) => {
    const {Component, ChildComponent, fetch, block, blockKey, serviceId, params} = props;
    const [dataState, setDataState] = React.useState<LoadableState>(initData);
    const [refetchIndex, setRefetchIndex] = React.useState<number>(0);
    const onTryAgain = React.useCallback(() => {
        setRefetchIndex(refetchIndex + 1);
    }, [refetchIndex]);

    React.useEffect(() => {
        async function processData() {
            setDataState({loading: true, error: false});

            let data, error;

            try {
                data = await fetch({blockKey, serviceId, ...(params ?? {})});
                error = false;

                setDataState({data, loading: false, error});
            } catch {
                error = true;
                setDataState({loading: false, error});
            }
        }

        processData();
    }, [refetchIndex, fetch, blockKey, serviceId, params]);

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
