# Подготовка данных

Документацию по серверным утилитам для преобразования контента, включая конвертацию Yandex Flavored Markdown (YFM) в HTML и обработку текста. Основные возможности:

- **`fullTransform`**: Преобразует контент в формате YFM в HTML с настраиваемыми параметрами.
- **Утилиты**: `typografToText`, `typografToHTML` и `yfmTransformer` для обработки текста в пользовательских компонентах.
- **`createItemsParser`**: Утилита для преобразования определённых полей в блоках, поддерживающая вложенные поля и массивы.

### Серверные утилиты

Пакет включает набор серверных утилит для преобразования контента.

```ts
const {fullTransform} = require('@gravity-ui/page-constructor/server');

const {html} = fullTransform(content, {
  lang,
  extractTitle: true,
  allowHTML: true,
  path: __dirname,
  plugins,
});
```

Для преобразования Yandex Flavored Markdown в HTML используется пакет `diplodoc/transfrom`, который входит в peer-зависимости.

Эти утилиты можно также использовать в кастомных компонентах или других частях проекта.

```ts
const {
  typografToText,
  typografToHTML,
  yfmTransformer,
} = require('@gravity-ui/page-constructor/server');

const post = {
  title: typografToText(title, lang),
  content: typografToHTML(content, lang),
  description: yfmTransformer(lang, description, {plugins}),
};
```

Список других доступных утилит можно найти в [этом разделе](https://github.com/gravity-ui/page-constructor/tree/main/src/text-transform).

## Документация к `createItemsParser`

Метод `createItemsParser` — это утилита, для создания парсеров блоков. Он помогает с преобразованием определённых полей с использованием трансформера. Метод имеет опции, позволяющие указать, какие поля нужно преобразовать и как обрабатывать вложенные поля.

### Сигнатура метода

```typescript
export const createItemsParser = (fields: string[]) => (transformer: Transformer, items: Item[]) => Item[];
```

### Параметры

- **fields**: Массив строк, указывающих поля для преобразования. Эти поля могут быть вложенными, используя точечную нотацию (например, `'nested.field'`).
- **transformer**: Функция, которая принимает строку и возвращает преобразованную строку. Эта функция будет применена к указанным полям.
- **items**: Массив элементов для парсинга и преобразования. Каждый элемент может быть строкой или сложным объектом.

### Возвращаемое значение

- Возвращает массив элементов с преобразованными указанными полями с помощью функции `transformer`.

## Примеры использования

### Пример 1: Базовое использование

В этом примере преобразуются поля `text` и `additionalInfo` каждого элемента в массиве `items` с использованием `yfmTransformer`.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'additionalInfo']),
};
```

**Input:**

```json
[
  {"text": "Hello, world!", "additionalInfo": "This is a test."},
  {"text": "Another item", "additionalInfo": "More info here."}
]
```

**Output:**

```json
[
  {"text": "Transformed: Hello, world!", "additionalInfo": "Transformed: This is a test."},
  {"text": "Transformed: Another item", "additionalInfo": "Transformed: More info here."}
]
```

### Пример 2: Вложенные поля

В этом примере преобразуется вложенное поле `list.text` внутри каждого элемента.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['list.text']),
  renderInline: true,
};
```

**Input:**

```json
[{"list": {"text": "Вложенный текст 1"}}, {"list": {"text": "Вложенный текст 2"}}]
```

**Output:**

```json
[
  {"list": {"text": "Transformed: Вложенный текст 1"}},
  {"list": {"text": "Transformed: Вложенный текст 2"}}
]
```

### Пример 3: Смешанные типы данных

В этом примере массив `items` содержит как строки, так и сложные объекты. Метод `createItemsParser` корректно обрабатывает оба типа данных.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'list.text']),
};
```

**Input:**

```json
["Простая строка", {"text": "Текст объекта", "list": {"text": "Вложенный текст"}}]
```

**Output:**

```json
[
  "Transformed: Простая строка",
  {"text": "Transformed: Текст объекта", "list": {"text": "Transformed: Вложенный текст"}}
]
```

## Примечания

- Если поле не найдено в элементе, оно будет пропущено.
- Если указано вложенное поле, но родительский объект не является объектом или не является массивом, преобразование для этого поля будет пропущено.
- Метод не изменяет исходные элементы, а возвращает новый массив с преобразованными данными.

### Обработка вложенных массивов

Если вложенное поле является массивом, метод `createItemsParser` будет итерировать по каждому элементу массива и применять трансформер к указанному полю. Это особенно полезно при работе с массивами объектов, содержащими поля, которые требуют преобразования.

### Пример 4: Вложенное поле как массив

В этом примере преобразуется поле `text` внутри каждого объекта в массиве `list`, который является вложенным полем элементов `items`.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['list.text']),
};
```

**Input:**

```json
[
  {
    "list": [{"text": "Вложенный текст 1"}, {"text": "Вложенный текст 2"}]
  },
  {
    "list": [{"text": "Вложенный текст 3"}, {"text": "Вложенный текст 4"}]
  }
]
```

**Output:**

```json
[
  {
    "list": [{"text": "Transformed: Вложенный текст 1"}, {"text": "Transformed: Вложенный текст 2"}]
  },
  {
    "list": [{"text": "Transformed: Вложенный текст 3"}, {"text": "Transformed: Вложенный текст 4"}]
  }
]
```

## Полный пример со всеми случаями

Вот комплексный пример, включающий все возможные случаи: обычные поля, вложенные объекты и вложенные массивы.

```typescript
const config = {
  fields: ['items'],
  transformer: yfmTransformer,
  parser: createItemsParser(['text', 'list.text', 'details.info']),
};

const transformedItems = config.parser(config.transformer, items);
```

**Input:**

```json
[
  {
    "text": "Обычный текст",
    "list": [{"text": "Вложенный текст 1"}, {"text": "Вложенный текст 2"}],
    "details": {
      "info": "Вложенная информация"
    }
  },
  {
    "text": "Другой обычный текст",
    "list": {"text": "Вложенный текст 3"},
    "details": {
      "info": "Другая вложенная информация"
    }
  }
]
```

**Output:**

```json
[
  {
    "text": "Transformed: Обычный текст",
    "list": [
      {"text": "Transformed: Вложенный текст 1"},
      {"text": "Transformed: Вложенный текст 2"}
    ],
    "details": {
      "info": "Transformed: Вложенная информация"
    }
  },
  {
    "text": "Transformed: Другой обычный текст",
    "list": {"text": "Transformed: Вложенный текст 3"},
    "details": {
      "info": "Transformed: Другая вложенная информация"
    }
  }
]
```
