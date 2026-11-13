import {Plus, TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Text, TextInput} from '@gravity-ui/uikit';

import {CommonProps, TextListField} from '../../types';
import {formGeneratorCn} from '../../utils/cn';
import {getValueByPath} from '../../utils/fields';
import Base from '../Base/Base';

import './TextListInput.scss';

const b = formGeneratorCn('text-list-input');

const TextListInput = ({
    name,
    title,
    when,
    defaultValue,
    placeholder,
    addButtonText = 'Add item',
    content,
    onUpdate,
}: CommonProps & TextListField) => {
    const stored = getValueByPath(content, name) ?? defaultValue;
    const values: string[] = Array.isArray(stored) ? stored : [];

    return (
        <Base
            name={name}
            when={when}
            content={content}
            onUpdate={onUpdate}
            defaultValue={defaultValue}
        >
            <div className={b()}>
                <Text variant="subheader-1" color="hint" className={b('title')}>
                    {title}
                </Text>
                <div className={b('items')}>
                    {values.map((value, index) => (
                        <div className={b('row')} key={index}>
                            <TextInput
                                className={b('input')}
                                controlProps={{'aria-label': `${title} ${index + 1}`}}
                                value={value}
                                placeholder={placeholder}
                                name={`${name}[${index}]`}
                                onUpdate={(next) =>
                                    onUpdate(
                                        name,
                                        values.map((item, i) => (i === index ? next : item)),
                                    )
                                }
                            />
                            <Button
                                view="flat"
                                className={b('remove')}
                                aria-label={`Remove item ${index + 1}`}
                                onClick={() =>
                                    onUpdate(
                                        name,
                                        values.filter((_, i) => i !== index),
                                    )
                                }
                            >
                                <Icon data={TrashBin} size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button className={b('add')} onClick={() => onUpdate(name, [...values, ''])}>
                    <Icon data={Plus} size={16} />
                    {addButtonText}
                </Button>
            </div>
        </Base>
    );
};

export default TextListInput;
