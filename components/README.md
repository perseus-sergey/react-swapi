# React Components RS-School task

# React + TypeScript + Vite + Eslint + Prettier + Husky + FontAwesome

### Install all dependencies (node_modules)

```
   yarn install
```

---

### Scripts

For running the project use this commands in terminal:

```
   dev
   #then
   o
```

In development mode you can use:

- for build APP

```
yarn build
```

- for deploy project in GH-Pages

```
yarn deploy
```

- prettier for feat code style

```
yarn format
```

- prettier for fix all code style issues

```
yarn fix
```

- ESLint for check the code for issues

```
yarn lint
```

"dev": "vite --host",
"build": "tsc && vite build",
"deploy": "yarn build && gh-pages -d dist -e ",
"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
"fix": "prettier --fix",
"format": "prettier --write \"src/\*_/_.{ts,tsx,css}\"",
"preview": "vite preview",
"precommit": "lint-staged",
"prepare": "husky install"
