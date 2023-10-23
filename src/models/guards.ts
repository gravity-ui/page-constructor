import {
    Block,
    BlockTypes,
    ConstructorItem,
    FormBlockData,
    FormBlockHubspotData,
    FormBlockYandexData,
} from './';
import {MetrikaGoal, NewMetrikaGoal} from './index';

export function isBlock(block: ConstructorItem): block is Block {
    return block.type in BlockTypes;
}

export function isNewMetrikaFormat(metrika: MetrikaGoal): metrika is NewMetrikaGoal[] {
    return Boolean(Array.isArray(metrika) && metrika.length && typeof metrika[0] === 'object');
}

export function isYandexDataForm(data: FormBlockData): data is FormBlockYandexData {
    return Boolean((data as FormBlockYandexData).yandex);
}

export function isHubspotDataForm(data: FormBlockData): data is FormBlockHubspotData {
    return Boolean((data as FormBlockHubspotData).hubspot);
}
