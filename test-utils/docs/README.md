## Tests

### Run Tests

In order to run all tests use command:

```bash
npm run test
```

To execute specific test(s), utilize the `-t` option followed by a string that must be present in the test path. This allows you to filter and run only the desired tests based on the specified criteria.

```bash
npm run test -t Image # runs tests for both BackgrounImage and Image

npm run test -t /Image # runs a test for Image only
```

### Utils

To perform component testing within the package, we employ the [@testing-library/react library](https://testing-library.com/docs/react-testing-library/intro/), which leverages the underlying functionality of [jest](https://jestjs.io/).

The configuration files are located in the `./test-utils` folder. Alongside the standard configurations, we have included a `./test-utils/custom-environment.ts` file. This file addresses the issue of missing `window` methods, like `matchMedia`, in the testing environment.

Additionally, we store all shared tests in this folder. There are two categories of shared tests. The first is `common.tsx`, which consists of tests that can be utilized independently in multiple components. The second is `{component}.tsx`, which includes tests specific to a particular component that can be reused in other components. For instance, `./src/components/BackgroundImage/BackgroundImage.tsx` utilizes `./src/components/Image/Image.tsx` as a child. Consequently, many tests for the `Image` component can be utilized to test the `BackgroundImage` component as well.

✅ The shared tests of the second type are named after the component that possesses a lower level of abstraction.

For instance, since the `Image` component is a part of the `BackgroundImage` component, the shared test should be named `image.tsx` rather than `background-image.tsx`.

### Component Test

All tests for a component are stored in the `__tests__` folder. Typically, there is a single `*.test.tsx` file within the folder, named after the component. However, there is no strict rule that restricts the number of test files that can be present.

```
...

|- BackgroundImage
  |- __stories__
  |- __tests__
    |- BackgroundImage.test.tsx
  |- BackgroundImage.tsx
  |- BackgroundImage.scss

...
```

Typically, when working with `jest` tests, it's common to organize them into suites. These suites serve as containers for a group of related tests. Essentially, a suite is contained within a single file and brings together all the tests associated with a specific component.

Follow the steps below to write your own test:

- Use the describe function from `Jest` to define your test suites.
- Inside each suite, use the test or it function to define your test cases.
- Render your component using the [render](https://testing-library.com/docs/react-testing-library/api#render) function.
- Use the [screen](https://testing-library.com/docs/queries/about/#screen) object from `@testing-library/react` to query and interact with the rendered component.
- Use the `expect` function from `@testing-library/jest-dom` to make assertions about the rendered component.

```ts
describe('BackgroundImage', () => {
    test('Render BackgroundImage by default', async () => {
        render(<BackgroundImage qa={qaId} />);

        const component = screen.getByTestId(qaId);
        expect(component).toBeInTheDocument();
        expect(component).toBeVisible();
    });

    ...
```

### Rules

#### Avoid Direct Node Access

It is important to avoid direct Node access when writing tests. This means refraining from using methods like `querySelector` or `querySelectorAll`. Instead, we should rely on testing library methods such as `getByRole`, `getByText`, or `getByTestId` to access components.

In some cases, the prop being tested may have an impact on a deeply nested container within the component. It can be tempting to access this container using `querySelector` or similar methods. However, it is advised to resist this temptation and continue utilizing the recommended testing library methods for accessing and interacting with components.

```ts
// ⚠️ DO NOT USE
screen.getByTestId(id).querySelector('p');
```

⚠️ Engaging in such practices is strictly discouraged, and there are compelling reasons for doing so. You can find detailed explanations regarding the importance of avoiding direct node access and the associated reasons by referring to the documentation available at [avoid-direct-node-access.md](./avoid-direct-node-access.md).

#### Roles

There are [list of default roles](./default-roles.md).

```ts
// ✅ usage
const image = getByRole('img');
```

🚫 Although it is possible to extend the list of roles with custom ones, it is strongly discouraged due to the creation of invalid HTML code.

```ts
// ⚠️ DO NOT USE

// Component.tsx
<div role="custom-role">

// Test.ts
const component = getByRole("custom-role");
```

#### Testing ID

Another option, you have to access any tags in a component is to add `data-qa` prop.

To add a data-qa attribute to elements in your components and access those elements in your tests using `@testing-library/react`, you can follow these steps:

1. Add data-qa attributes to elements: In your component's TSX code, add the `data-qa` attribute to the elements you want to target in your tests. Assign a meaningful value to the attribute that helps identify the purpose or role of the element.

```ts
const BackgroundImage = (props: WithChildren<BackgroundImageProps>) => {
  const {qa} = props;

  return <div data-qa="background-image">{/* Other components */}</div>;
};
```

2. Access elements using data-qa attributes: Use the `getByTestId` or other query methods provided by `@testing-library/react` to access the elements based on their data-qa attributes.

```ts
const submitButton = getByTestId('background-image');
```

It is possible to change `data-qa` dinamically:

```ts
const BackgroundImage = (props: WithChildren<BackgroundImageProps>) => {
  const {qa} = props;

  return <div data-qa={qa}>{/* Other components */}</div>;
};
```

#### Shared Test

✅ Reusing common tests ensures efficiency, consistency, and scalability in software testing, reducing duplication, improving maintenance, and promoting standardized behavior across components.

Testing common props like `className`, `style`, and others is a recurring task that appears in nearly every test scenario.

Shared test implementation:

```ts
import {testCustomClassName} from './test-utils/shared/common';

...

test('add className', () => {
    testCustomClassName<BackgroundImageProps>({
        component: BackgroundImage,
        props: {qa: qaId},
    });
});
```

### Tests Development

It is recommended to prefix branch names with `test/...` when working on test-related branches. Additionally, commits and Pull Requests can follow a naming convention such as `test({ComponentName}): test for {ComponentName} added` to clearly indicate the addition of tests for a specific component.
