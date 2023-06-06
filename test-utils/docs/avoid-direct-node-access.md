# Avoid direct Node access

It is important to avoid direct Node access and instead prefer using the methods provided by Testing Library for several reasons:

Emulates User Behavior: Testing Library methods simulate user behavior and interactions with the components. This approach closely resembles how users interact with the application, ensuring that tests are focused on the actual user experience.

Encourages Testing Best Practices: Testing Library promotes writing tests that closely resemble how users interact with the application, focusing on the output rather than implementation details. By avoiding direct Node access, you are encouraged to write tests that are more resilient to changes in the component's structure or implementation details.

Improves Test Maintainability: Directly accessing the DOM nodes bypasses the component's API and can lead to brittle tests. If the component's structure or markup changes, tests relying on direct Node access may break, requiring significant test modifications. Utilizing Testing Library methods provides an abstraction layer that shields your tests from such changes, making them more maintainable.

Increases Test Readability and Expressiveness: Testing Library methods have descriptive names that convey the intent of the test. By using these methods, your test code becomes more readable and expressive, making it easier for other developers to understand the purpose of the tests.

Enhances Test Portability: Tests written with Testing Library methods are more portable and reusable. Since they are not tightly coupled to the specific implementation details of the component, they can be easily adapted and used with different versions or implementations of the same component.

Overall, avoiding direct Node access and relying on Testing Library methods promotes testing best practices, improves test maintainability, readability, and portability, ensuring that your tests remain robust and effective even as your codebase evolves.
