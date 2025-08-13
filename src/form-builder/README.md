# FormBuilder

Компонент для визуального создания и редактирования форм.

## Как подключить

```bash
import {FormBuilder} from '@gravity-ui/page-constructor/form-builder';
```

## Пропсы

| Пропс        | Тип                             | Описание                                             |
| ------------ | ------------------------------- | ---------------------------------------------------- |
| `formFields` | `FormField[]`                   | Массив полей формы, которые отображаются в редакторе |
| `className`  | `string`                        | Дополнительный CSS-класс для стилизации компонента   |
| `onChange`   | `(fields: FormField[]) => void` | Колбэк, вызываемый при изменении структуры формы     |

## Примеры использования

```tsx
import React from 'react';
import {FormBuilder, FormField} from '@gravity-ui/page-constructor/form-builder';

const MyFormBuilder = () => {
  const [formFields, setFormFields] = React.useState<FormField[]>([]);

  return <FormBuilder formFields={formFields} onChange={setFormFields} />;
};
```
