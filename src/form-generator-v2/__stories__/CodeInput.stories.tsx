import {Meta, StoryFn} from '@storybook/react';

import {useResultPanel} from '../../../.storybook/addons/result-addon/useResultPanel';
import FormGenerator from '../FormGenerator';
import {Content, Fields} from '../types';

export default {
    title: 'FormGenerator/CodeInput',
    component: FormGenerator,
    parameters: {
        layout: 'padded',
        resultPanel: true,
    },
} as Meta<typeof FormGenerator>;

const Template: StoryFn<{blockConfig: Fields}> = ({blockConfig}) => {
    const [content, setContent] = useResultPanel<Content>({});
    return (
        <div style={{maxWidth: 700}}>
            <FormGenerator
                blockConfig={blockConfig}
                contentConfig={content}
                onUpdate={setContent}
            />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    blockConfig: [
        {
            type: 'codeInput',
            name: 'customCode',
            title: 'Custom code',
            language: 'yaml',
            defaultValue: 'key: value\n',
        },
    ] as Fields,
};

export const Json = Template.bind({});
Json.args = {
    blockConfig: [
        {
            type: 'codeInput',
            name: 'jsonConfig',
            title: 'JSON config',
            language: 'json',
            defaultValue: '{\n  "key": "value"\n}',
        },
    ] as Fields,
};

export const WithValidation = Template.bind({});
WithValidation.args = {
    blockConfig: [
        {
            type: 'codeInput',
            name: 'serviceConfig',
            title: 'Service config',
            defaultValue: 'name: example\n',
            validate: (code) =>
                code.includes('service:')
                    ? undefined
                    : 'Add the service field to the configuration.',
        },
    ] as Fields,
};

export const JsonSyntaxError = Template.bind({});
JsonSyntaxError.args = {
    blockConfig: [
        {
            type: 'codeInput',
            name: 'jsonConfig',
            title: 'JSON config',
            language: 'json',
            defaultValue: '{"enabled": }',
        },
    ] as Fields,
};

export const YamlSyntaxError = Template.bind({});
YamlSyntaxError.args = {
    blockConfig: [
        {
            type: 'codeInput',
            name: 'yamlConfig',
            title: 'YAML config',
            defaultValue: 'title: Пример\nitems: [one, two',
        },
    ] as Fields,
};
