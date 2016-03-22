# jspm-build

## Overview

This project is a particular implementation of [`jspm`](http://jspm.io/) that allows for use of ES6 modules and syntax in development and deployment to ES5, browser-friendly code in production. It takes an extra step of transpiling each JavaScript module in separate files to
support asynchronous dependency loading during runtime. *These asynchronous loads in production do not rely on in-browser transpiling; they are simply ES5 modules that are asynchronously fetched on an as-needed basis.*

[jspm](http://jspm.io/) is a package manager that helps normalize packages written in different modules formats. It allows the developer to load nearly any `npm` package and makes them suitable for client-side use (e.g., `jspm install d3`) via `import` statements. All of these dependencies are then housed in the `package.json` for centralized dependency management.

`jspm` utilizes the [SystemJS](https://github.com/systemjs/systemjs/blob/master/docs/overview.md) module loader and [ES6 Module Loader Polyfill](https://github.com/ModuleLoader/es6-module-loader) so that it can load any sort of module (ES6, CommonJS, etc.).

Using `jspm` helps create a "future-proof" environment by
* Allowing the developer to write ES6 modules and syntax pending browser adoption
* Supporting a myriad of current, ES5 module formats
* Creating a suitable module-loading system for an HTTP/2 environment

## General Worfklow

Run a server on `localhost:8080` by running `npm run serve`.

Toggle between envrionments with `npm run build` (for production) and `npm run unbuild` (for development).

## Project Setup

Clone the repository and change directories
```
git clone https://github.com/matt-mcdaniel/jspm-build.git && cd jspm-build
```

Make sure that `jspm` is installed globally
```
npm install -g jspm
```

Install dependencies
```
npm install && jspm install
```

## Configure Development Environment

For development, the browser will load and transpile all of the ES6 modules and syntax at runtime using [babel](https://babeljs.io/).

```
npm run unbuild
```

## Build for Production

For production, a bundle will be created consisting of each file in the dependency tree specified in `src/main.js`. All of the explicit imports (those declared with the `import module from "my/module.js"`) in the dependency tree will be built into `build/src/main.bundle.js` in ES5 code. It will also convert all of the ES6 code into ES5 modules and place them into separate files in the build folder for asynchronous loading.

```
npm run build
```
