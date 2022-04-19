Блок с медиа и фичами (пример - блок про безопасность с главной страницы)

`type: security-block`;

`title: строка` - заголовок;

`media: Media` - медиа под фичами;

`theme?: light | dark`;

`backgroundColor?: string` - цвет фона;

`points: SecurityBlockPoint[]` - описание фич в верхней части

- `img: string` - иконка;
- `text: string` - текст фичи;
- link: - сслыка под текстом
  - text: string;
  - url: string;
