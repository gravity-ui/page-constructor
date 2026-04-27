# FormGenerator

Компонент для динамической генерации форм на основе конфигурации. Поддерживает различные типы полей, вложенные структуры и условное отображение.

## Подключение

Импортируйте компонент в ваш файл:

```typescript
import {FormGenerator} from '@gravity-ui/page-constructor/form-generator';
```

## Пропсы

Компонент принимает следующие пропсы:

| Пропс           | Тип                                              | Описание                                                                          |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------------------------- |
| `blockConfig`   | `Array<ConfigInput>`                             | Массив конфигураций полей формы                                                   |
| `contentConfig` | `object`                                         | Объект с текущими значениями полей                                                |
| `onUpdateByKey` | `(key: string, value: DynamicFormValue) => void` | Колбэк, вызываемый при изменении значения поля по ключу                           |
| `onUpdate`      | `(value: object) => void`                        | Колбэк, вызываемый при изменении любого поля, с обновленным объектом конфигурации |
| `className`     | `string`                                         | Дополнительный CSS-класс для обертки формы                                        |

## Типы полей

FormGenerator поддерживает следующие типы полей:

- `text` - текстовое поле
- `boolean` - переключатель
- `textarea` - многострочное текстовое поле
- `select` - выпадающий список или радиокнопки
- `number` - числовое поле
- `object` - вложенный объект с полями
- `array` - массив значений
- `oneOf` - выбор одного варианта из нескольких
- `anyOf` - выбор нескольких вариантов из нескольких

## Условное отображение

Поле можно показывать/скрывать на основе значения другого поля с помощью параметра `showIf` в конфигурации поля:

```typescript
{
  name: 'advancedOptions',
  title: 'Расширенные настройки',
  type: 'object',
  properties: [...],
  showIf: 'showAdvanced === true'
}
```

В `showIf` можно использовать:

- `block.<path>` - для доступа к значениям других полей
- Строковые литералы в кавычках
- Операторы `===` и `!==`

## Примеры использования

### Базовое использование

```tsx
import * as React from 'react';
import DynamicForm from '../../src/form-generator/FormGenerator';

const MyForm = () => {
  const [contentConfig, setContentConfig] = React.useState({});

  const blockConfig = [
    {
      type: 'text',
      name: 'title',
      title: 'Заголовок',
    },
    {
      type: 'number',
      name: 'count',
      title: 'Количество',
    },
    {
      type: 'boolean',
      name: 'isActive',
      title: 'Активный',
    },
  ];

  return (
    <DynamicForm
      blockConfig={blockConfig}
      contentConfig={contentConfig}
      onUpdate={setContentConfig}
    />
  );
};
```

### Вложенные структуры

```tsx
const blockConfig = [
  {
    type: 'object',
    name: 'style',
    title: 'Стиль',
    properties: [
      {
        type: 'text',
        name: 'color',
        title: 'Цвет',
      },
      {
        type: 'number',
        name: 'fontSize',
        title: 'Размер шрифта',
      },
    ],
  },
];
```

### Массивы

```tsx
const blockConfig = [
  {
    type: 'array',
    name: 'items',
    title: 'Элементы',
    arrayType: 'text',
    buttonText: 'Добавить элемент',
  },
];
```

### Условное отображение

```tsx
const blockConfig = [
  {
    type: 'select',
    name: 'styleType',
    title: 'Тип стиля',
    view: 'select',
    mode: 'single',
    enum: [
      {value: 'simple', content: 'Простой'},
      {value: 'advanced', content: 'Расширенный'},
    ],
  },
  {
    type: 'object',
    name: 'advancedStyle',
    title: 'Расширенные настройки',
    properties: [
      // ... поля
    ],
    showIf: 'styleType === "advanced"',
  },
];
```
