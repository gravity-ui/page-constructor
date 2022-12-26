import evalExp from '@doc-tools/transform/lib/liquid/evaluation';
import {PageContent} from '@gravity-ui/page-constructor';
import {Lang} from '../models/locale';

type FilteringOptions = {
    lang: Lang;
    region?: string;
};

type FilterItemsProps = {
    items: Record<string, unknown>[] | unknown;
    itemsKey: string;
    options: FilteringOptions;
};

/**
 * Filters items by expression and removes empty items.
 * @param {Array} items
 * @param {string} itemsKey
 * @param {Object.<string, Lang>} vars
 * @return {Array}
 */
export const filterItems = ({items, itemsKey, options}: FilterItemsProps) => {
    if (!Array.isArray(items)) {
        throw new Error(
            `Error while filtering: items has invalid key '${itemsKey}' equals ${JSON.stringify(
                items,
            )}`,
        );
    }

    return items.reduce((result, item) => {
        const {when} = item;
        const whenResult =
            when === true ||
            when === undefined ||
            (typeof when === 'string' && evalExp(when, options));

        delete item.when;

        if (whenResult) {
            const property = item[itemsKey];

            if (property === undefined) {
                result.push(item);
            } else {
                const filteredProperty = filterItems({items: property, itemsKey, options});

                if (filteredProperty.length !== 0) {
                    result.push({
                        ...item,
                        [itemsKey]: filteredProperty,
                    });
                }
            }
        }

        return result;
    }, []);
};

/**
 * Filters content.
 * @param {PageContent} content
 * @param {Object.<string, Lang>} options
 * @return {PageContent}
 */
export const filterContent = (content: PageContent, options: FilteringOptions) => {
    if (Array.isArray(content)) {
        return filterItems({items: content, itemsKey: '', options}).map((item: PageContent) =>
            filterContent(item, options),
        );
    } else if (content && typeof content === 'object') {
        return Object.entries(content).reduce((acc: Record<string, PageContent>, [key, value]) => {
            acc[key] = filterContent(value, options);
            return acc;
        }, {});
    } else {
        return content;
    }
};
