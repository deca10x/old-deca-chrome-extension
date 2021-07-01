# deca-chrome-extension

Chrome extension to save websites you visit to deca

## Local development

This project uses webpack to generate the popup, options, and background script.

- `yarn dev` starts the development server for `/options.html`.
- `yarn build` builds the extension and places all required file into the `build` directory.

## Installing locally

Run `yarn build` to create the `build` directory. Then, go to [chrome://extensions](chrome://extensions) to load the extension by clicking `Load unpacked` and selecting `build`.
