import Ajv, {ErrorObject} from 'ajv';
import ajvKeywords from 'ajv-keywords';
import yaml from 'js-yaml';
import SourceMap from 'js-yaml-source-map';
import {JSONSchema4} from 'json-schema';
import isArray from 'lodash/isArray';

export interface CodeEditorMessageProps {
    text: string;
    status: CodeEditorMessageStatus;
}

export enum CodeEditorMessageStatus {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export function initAjv(schemas: JSONSchema4[]) {
    const ajv = new Ajv({$data: true, allErrors: true, schemas, strict: false});

    ajvKeywords(ajv, 'select');

    return ajv;
}

export function validate(content: string, ajv: Ajv, schema: JSONSchema4) {
    let result: CodeEditorMessageProps;

    if (!content) {
        return {status: CodeEditorMessageStatus.SUCCESS, text: 'Okay!'};
    }

    try {
        const jsYamlMap = new SourceMap();
        const data = yaml.load(content, {listener: jsYamlMap.listen()});

        ajv.validate(schema, data);
        if (ajv.errors) {
            const messages = ajv.errors.map(
                ({instancePath, schemaPath, message, params}: ErrorObject) => {
                    const pointer = jsYamlMap.lookup(instancePath.split('/').filter(Boolean));
                    const stringParams = Object.entries(params).map(([key, value]) => {
                        if (isArray(value)) {
                            return `${key}: ${value.join(' | ')}`;
                        }
                        return `${key}: ${value}`;
                    });
                    const ref = pointer ? `${pointer.line}: ` : '';
                    return `${ref}${instancePath || schemaPath}: ${message}\n${stringParams.join(
                        '\n',
                    )}`;
                },
            );
            result = {status: CodeEditorMessageStatus.WARNING, text: messages.join('\n\n')};
        } else {
            result = {status: CodeEditorMessageStatus.SUCCESS, text: 'Okay!'};
        }
    } catch ({message}) {
        result = {status: CodeEditorMessageStatus.ERROR, text: message as string};
    }

    return result;
}
