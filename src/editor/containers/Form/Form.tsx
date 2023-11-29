import React, {Fragment, memo} from 'react';

import {Tabs, TabsProps} from '@gravity-ui/uikit';
import {JSONSchema4} from 'json-schema';

import {Block, PageContent} from '../../../models';
import {block, getBlockKey} from '../../../utils';
import {BlockForm} from '../../components/BlockForm/BlockForm';
import {CodeEditor} from '../../components/CodeEditor/CodeEditor';
import {PagePropsForm, PagePropsFormData} from '../../components/PagePropsForm/PagePropsForm';
import useFormSpec from '../../hooks/useFormSpec';
import {CodeEditorMessageProps} from '../../utils/validation';

import './Form.scss';

enum FormTab {
    Blocks = 'blocks',
    Page = 'page',
    Code = 'code',
}

const b = block('editor-form');

const tabsItems = Object.values(FormTab).map((tab) => ({
    id: tab,
    title: tab,
}));

export interface FormProps {
    content: PageContent;
    activeBlockIndex: number;
    schema: JSONSchema4;
    codeValidator: (code: string) => CodeEditorMessageProps;
    onChange: (content: PageContent) => void;
    onSelect: (index: number) => void;
}

export const Form = memo(
    ({content, onChange, activeBlockIndex, onSelect, schema, codeValidator}: FormProps) => {
        const [activeTab, setActiveTab] = React.useState(FormTab.Blocks);
        const {blocks, ...page} = content || {};
        const spec = useFormSpec(schema);
        const {blocks: blocksSpec, page: pageSpec} = spec || {};

        let form;

        switch (activeTab) {
            case FormTab.Page: {
                form = (
                    <PagePropsForm
                        spec={pageSpec}
                        data={page}
                        onChange={(data: PagePropsFormData) => {
                            return onChange({
                                ...content,
                                ...data,
                            });
                        }}
                    />
                );
                break;
            }
            case FormTab.Blocks: {
                form = (
                    <Fragment>
                        {blocks.map((blockData, index) =>
                            blocksSpec[blockData.type] ? (
                                <div
                                    className={b('block-form')}
                                    key={getBlockKey(blockData, index)}
                                >
                                    <BlockForm
                                        spec={blocksSpec[blockData.type]}
                                        data={blockData}
                                        active={activeBlockIndex === index}
                                        onChange={(data: Block) => {
                                            onChange({
                                                ...content,
                                                blocks: [
                                                    ...blocks.slice(0, index),
                                                    data,
                                                    ...blocks.slice(index + 1),
                                                ],
                                            });
                                        }}
                                        onSelect={() => onSelect(index)}
                                    />
                                </div>
                            ) : null,
                        )}
                    </Fragment>
                );
                break;
            }
            case FormTab.Code: {
                form = (
                    <CodeEditor content={content} onChange={onChange} validator={codeValidator} />
                );
                break;
            }
        }

        return (
            <div className={b({'code-editor-active': activeTab === FormTab.Code})}>
                <Tabs
                    activeTab={activeTab}
                    className={b('tabs')}
                    items={tabsItems}
                    onSelectTab={setActiveTab as TabsProps['onSelectTab']}
                />
                {form}
            </div>
        );
    },
);

Form.displayName = 'Form';
