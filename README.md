# deca-chrome-extension

Chrome extension to save websites you visit to deca

## Local development

This project uses webpack to generate the popup, options, and background script.

- `yarn dev` starts the development server. Both `/popup.html` and `/options.html` are served.
- `yarn build` builds the extension and places all required file into the `build` directory.

## Building

Run `yarn build` to create the build directory. Then, go to [chrome://extensions](chrome://extensions) to load the extension by selecting this `build` directory.
