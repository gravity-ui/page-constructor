import {isEqual} from 'lodash';

import type {Content} from '../../form-generator-v2/types';
import type {FormField} from '../types';

import {getFieldPaths} from './fieldPaths';

interface PathNode {
    leaf?: boolean;
    children: Map<string, PathNode>;
    item?: PathNode;
}

const createNode = (): PathNode => ({children: new Map()});

export const pruneContent = (content: Content, fields: FormField[]): Content => {
    const root = createNode();
    for (const {parts, placeholders} of getFieldPaths(fields)) {
        let node = root;
        for (const part of parts) {
            if (placeholders.has(part)) {
                node.item ??= createNode();
                node.children.set(part, node.item);
                node = node.item;
            } else {
                const child = node.children.get(part) ?? createNode();
                node.children.set(part, child);
                node = child;
            }
        }
        node.leaf = true;
    }

    const project = (value: unknown, nodes: PathNode[]): unknown => {
        // A named field owns its complete value, including text lists and selects.
        if (nodes.some((node) => node.leaf)) return value;
        if (value === null || typeof value !== 'object') return undefined;

        const entries: [string, unknown][] = [];
        for (const [key, child] of Object.entries(value)) {
            const matches = nodes.flatMap((node) => {
                const direct = node.children.get(key);
                const item = /^\d+$/.test(key) ? node.item : undefined;
                return [direct, item].filter((match): match is PathNode => Boolean(match));
            });
            if (!matches.length) continue;
            const next = project(child, matches);
            if (next !== undefined) entries.push([key, next]);
        }
        if (Array.isArray(value)) {
            const kept = new Map(entries);
            // Preserve row positions when a field inside a repeating section is removed.
            return value.map((_, index) => kept.get(String(index)) ?? {});
        }
        return entries.length ? Object.fromEntries(entries) : undefined;
    };

    const next = (project(content, [root]) ?? {}) as Content;
    return isEqual(content, next) ? content : next;
};
