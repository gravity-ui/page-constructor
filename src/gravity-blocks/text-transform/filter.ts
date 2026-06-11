/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */

import evalExp from '@diplodoc/transform/lib/liquid/evaluation';

import {ContentVariables} from './transformers';

type WhenValue = string | boolean | undefined;
type OrArray<T> = T | T[];
type OrArrayRecord<T> = Record<string, OrArray<T>>;
interface FilteredContentItem extends OrArrayRecord<FilteredContentItem> {}
type FilteredContent = OrArray<FilteredContentItem>;
type FilterableContentItem = FilteredContentItem & {when: WhenValue};
export type FilterableContent = OrArray<FilterableContentItem>;

function filterItems(
    items: FilterableContentItem[],
    vars: ContentVariables,
    propertyName?: string,
): FilterableContentItem[] | FilteredContentItem[] {
    if (!Array.isArray(items)) {
        throw new Error(
            `Error while filtering: items has invalid key '${propertyName}' equals ${JSON.stringify(
                items,
            )}`,
        );
    }

    return items.reduce<FilteredContentItem[]>((result, item) => {
        const passedFiltration = checkWhenCondition(item.when, vars);

        if (passedFiltration) {
            const property = propertyName && item[propertyName];

            if (property === undefined) {
                result.push(item);
            } else {
                const filteredProperty = filterItems(
                    property as FilterableContentItem[],
                    vars,
                    propertyName,
                );

                if (filteredProperty.length !== 0) {
                    result.push({
                        ...item,
                        [propertyName as string]: filteredProperty,
                    });
                }
            }
        }

        return result;
    }, []);
}

function checkWhenCondition(whenValue: WhenValue, vars: ContentVariables) {
    return (
        whenValue === true ||
        whenValue === undefined ||
        (typeof whenValue === 'string' && (!whenValue || evalExp(whenValue, vars)))
    );
}

function isItemArray(
    content: FilterableContent | FilteredContent,
): content is FilterableContentItem[] | FilteredContentItem[] {
    return Array.isArray(content);
}

function isItem(
    content: FilterableContent | FilteredContent,
): content is FilterableContentItem | FilteredContentItem {
    return content && typeof content === 'object' && !Array.isArray(content);
}

/**
 * Filters content recoursively by result of it's 'when' property evaluation applied to vars argument.
 * e.g. property {..., when: 'someVar == "someValue"' } will be included in result only if vars.someVar === 'someValue'
 * @param {FilterableContent} content
 * @param {ContentVariables} vars
 * @return {FilteredContent}
 */
export function filterContent(
    content: FilterableContent | FilteredContent,
    vars: ContentVariables,
): FilteredContent {
    if (isItemArray(content)) {
        return filterItems(content as FilterableContentItem[], vars).map((item) =>
            filterContent(item, vars),
        ) as FilteredContent;
    } else if (isItem(content)) {
        return Object.entries(content).reduce<FilteredContentItem>((acc, [key, value]) => {
            acc[key] = filterContent(value, vars);
            return acc;
        }, {});
    } else {
        return content;
    }
}
