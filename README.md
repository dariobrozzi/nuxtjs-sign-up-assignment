# Sign Up Assignment

- Create a client-side only rendered Nuxt 3 application that allows people to sign up for a product.
- The form should contain fields for email and password, which should be required and show an error if no value is entered.
- The password field should have a way to make the password visible.
- The user should be able to choose to receive occasional product updates and announcements.
- Once signed up, they should be presented with a success page.

## Commits tail + Notes:

### [build: init project and setup provetcloud](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/88450b9f9b5304d855d53516b9245c65f04ae170)

Setup design system (`ds`) styles and components following provided documentation.

> A separate layout component should be created in real life.  I just installed the basics for loading the styles and didn't get into too many components due to web-components slot incompatibilities with vue3.

### [feat(sign-up): add initial components](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/e9c60072e5a49aa6cd23e653ea6deb45e9d40dcc)

- Added a `@ds` alias to keep routes short and prevent future internal changes due to library updates.
- Created basis pages for home and signup.
- Added basic `FIXTURES` constant to keep literals organized.
- Created form UI following the `ds` guidelines.
> I tried to use just the basis for performing the assignment, so I didn't use the form header, which contains slot deprecated usage.\
If the product intends to support more languages, it's better to setup a `i18n` library and migrate `FIXTURES` there.

### [feat(sign-up): add validation](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/bc657ef8711fb9cec7c68c223a3fc6ced304e8ac)

- Added RegExp constants.
- Implemented a basic validation with reactive states.

### [feat(sign-up): add show/hide password functionality](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/a8f6f0229b785fd5f715c3397185ad16b1ccd843)

- Added show/hide password button.

> **Opinionated:** due to slot incompatibility,  I created a holder wrapping the password input and the action button.  With the latest slot support, it can be used by passing through the input `end` slot.  The current solution is not optimal since the content and the button position could also change.  I used all css vars shared on involved elements for calculation.

### [feat(sign-up): add subscribe option](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/4c95cb01aa5790c13d4cb203f368c4af159bbc45)
- Integrate `ds` checkbox to the solution.

### [feat(api) created signup api, refactor and cleanup](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/1057fbdf99e885f72653f797a1ac1a2195e7ffe2)

- Added a basic `server/api/signup` functionality to complete the prototype.
- Added call to the API.
- Some refactors and cleanup.

### [refactor(sign-up): create form composable and service](https://github.com/dariobrozzi/nuxtjs-sign-up-assignment/commit/3d18376e4d5abe4ea05332f5e98f0d56f9073a56)

- Created a `useAuthForm` composable grouping functionality and states related to validation.
- Moved the `API` call to services.
- Improved user message.

## Room for improvements

- Add unit tests.
- Split password input into a new component.

## Resources

[Provet Cloud Design System](https://provetcloud.design/)

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment#presets) for more information.
