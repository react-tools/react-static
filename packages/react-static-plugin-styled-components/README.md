# react-static-plugin-styled-components

A [React-Static](https://react-static.js.org) plugin that adds CSS-in-JS/SSR support for [styled-components](https://styled-components.com)

## Prerequisites

- styled-components 4+ (This has been tested with `4.3.2`)

## Installation

In an existing react-static site run:

```bash
$ yarn add react-static-plugin-styled-components styled-components
```

Then add the plugin to your `static.config.js`:

```javascript
export default {
  plugins: ["react-static-plugin-styled-components"]
};
```
