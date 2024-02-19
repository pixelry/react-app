# @pixelry/react-app

Modules and configurations for building production ready React applications.

- React 18 with React Router
- CSS Modules and Tailwind CSS
- Production build with hash named vendor bundling
- Customizable HTML
- Static build-time rendering for SEO and search engine friendliness
- Sitemap generation
- Jest test framework

At Pixelry we have many React applications. By standardizing configuration and build boilerplate in one package we can quickly create production ready apps. This also allows us to update the vendor dependencies and build tools to keep all our apps up to date in one place. Take a look at www.pixelry.com to see an example output site.

This is an opinionated setup, we're not trying to push a standard, we're simply sharing how we work. Feel free to use as is, fork, or look at the code to see what you can copy. We avoid a custom CLI (do you really need another abstraction?). You provide config files that extend the default ones we provide. You add scripts. No magic.

Installs React, React Router, Tailwind, TypeScript, Webpack, Jest, and their dependencies and utilities (so you don't have to).

## Quick Start

Installation

`npm i --save-dev @pixelry/react-app`

Create a webpack config file.

`./webpack.config.js`

```js
module.exports = require('@pixelry/react-app/webpack.config');
```

Create a typescript config file.

`./tsconfig.json`

```json
{
  "extends": "@pixelry/react-app/ts.config.json",
  "include": ["./**/*"]
}
```

Add a start script to the package json file.

`./package.json`

```json
"scripts" : {
  "start" : "webpack serve"
}
```

Create an index file.

`./index.tsx`

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

const main = document.getElementById('main');
if (main) {
  const root = createRoot(main);
  root.render(<div>Hello World!</div>);
}
```

Run.

`npm start`

## Production Build

Add a production scripts to the package json file.

`./package.json`

```json
  "scripts": {
    "start": "webpack serve",
    "build": "webpack --env production",
    "prod": "npm run build && http-server -p 8888 -c-1 --proxy http://localhost:8888/index.html? -d false ./dist",
    "check": "tsc",
    "test": "jest",
    "clean": "rimraf dist"
  },
```

Run Prod.

`npm run prod`

Be sure to add `dist` and `out` to `.gitignore`. The `out` folder is used for [build time rendering](#build-time-rendering).

## CSS Modules

Imported CSS files ending in `.module.css` are bundled as CSS modules.

`./src/main.tsx`

```tsx
import React from 'react';

import styles from './main.module.css';

export function Main() {
  return <div className={styles.main}>Hello World!</div>;
}
```

`./src/main.module.css`

```css
.main {
  font-size: 50px;
}
```

## Tailwind CSS

Create a Tailwind config file to enable Tailwind CSS.

`./tailwind.config.ts`

```js
module.exports = require('@pixelry/react-app/tailwind.config.js');
```

Use Tailwind CSS in any component.

`./src/main.tsx`

```tsx
import React from 'react';

export function Main() {
  return <div className={'text-red-500'}>Hello World!</div>;
}
```

## Unit Tests

Add a Jest config file to enable unit test.

`./jest.config.js`

```js
module.exports = require('@pixelry/react-app/jest.config');
```

Example unit test.

`tests/main.test.tsx`

```tsx
import React from 'react';
import renderer, { ReactTestRendererJSON } from 'react-test-renderer';

import { Main } from '../src/main';

test('<Main/>', () => {
  const component = renderer.create(<Main />);

  // validate the tree
  const tree = component.toJSON() as ReactTestRendererJSON;
  expect(tree?.children).toEqual(['Hello World!']);
});
```

Run the test.

`npm test`

## Static Assets

All files contained in the root `static` folder will be copied to site root.

## Custom HTML

A default EJS template is provided for HTML generation. This can be overridden by adding an EJS index file.

`./index.ejs`

```html
<!doctype html>
<!-- prettier-ignore -->
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>My Site</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, viewport-fit=cover" />

  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />

</head>

<body class="bg-light dark:bg-dark">
  <%= reactDiv %>
</body>

</html>
```

Note that `<%= reactDiv %>` is required to inject the root of react and server side rendering.

## Build Time Rendering

Render the HTML at build time to make search engine friendly routes.

Create a server file that renders to a string.

`./server.tsx`

```tsx
import React from 'react';
import { renderToString } from 'react-dom/server';

import { Main } from './main';

export function render(route: string) {
  return renderToString(<Main />);
}
```

Create a server side rendering webpack config file.

`./webpack.server.config.js`

```js
module.exports = require('@pixelry/react-app/webpack.server.config');
```

Create a node render file and call the render utility.

`./render.js`

```js
const render = require('@pixelry/react-app/render');

// pass array of routes to render
render(['/', '/about', '/contact']);
```

Add a render script and make sure the prod scripts are updated.

`./package.json`

```json
"scripts": {
  "start": "webpack serve",
  "build": "webpack --env production",
  "build:server": "webpack -c webpack.server.config.js --env production",
  "render": "npm run build && npm run build:server && node render.js",
  "prod": "npm run render && http-server -p 8888 -c-1 --proxy http://localhost:8888/index.html? -d false ./dist",
  "check": "tsc",
  "test": "jest",
  "clean": "rimraf dist && rimraf out"
}
```

Run prod.

`npm run prod`

In the dist folder there will now be an index.html for every route with the HTML build time rendered. These routes will be hydrated at runtime for a seamless experience. Note: the server files are located in the `out` folder. Add `dist` and `out` to `.gitignore`.

Example dist folder contents.

```ascii
dist
|____about
| |____index.html
|____contact
| |____index.html
|____index.html
|____main-5b34d.css
|____main-8a80e.js
|____main-8a80e.js.LICENSE.txt
|____sitemap.txt
|____vendor-2e325.js
|____vendor-2e325.js.LICENSE.txt
```
