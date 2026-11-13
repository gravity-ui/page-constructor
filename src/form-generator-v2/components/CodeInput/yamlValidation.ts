import yaml from 'js-yaml';

import type {CodeDiagnostic} from './MonacoCodeEditor';

export function validateYaml(code: string): CodeDiagnostic[] {
    try {
        yaml.loadAll(code);
        return [];
    } catch (error) {
        const {reason, message, mark} = error as yaml.YAMLException;
        const lines = code.split(/\r\n|\r|\n/);
        const reportedLine = (mark?.line ?? 0) + 1;
        const line = Math.min(reportedLine, lines.length);
        const column =
            reportedLine > lines.length ? lines[line - 1].length + 1 : (mark?.column ?? 0) + 1;

        return [{message: reason || message, severity: 'error', line, column}];
    }
}
