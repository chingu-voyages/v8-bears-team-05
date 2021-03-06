# v8-bears-team-05: Doodle Live

Take your team work to the Next level.

Work together anywhere, anytime!

## Features

1. Host Meetings with Unlimited Users.
2. Sketch & Share.
3. Live Chat Integration.
4. Share notes with our rich text editor.
5. Live code with Automatic Syntax Highlighting.
6. Easter eggs and much more...

## About the project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Then an Express server was added in the `server` directory.

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/chingu-voyages/v8-bears-team-05.git
cd bears-team-05
npm install
```

Create a `.env` file for environment variables in your project directory.

You can start the server on its own with the command:

Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

```bash
npm run server
```

Run the React application on its own with the command:

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash
npm start
```

Run both applications together with the command:

```bash
npm run dev
```

You can create an optimized production build with the command:

```bash
npm run build
```

The React application will run on port 3000 and the Express server on port 3001.

### VSCode + ESLint + Prettier

[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.

#### Installation guide

1. Install [VSCode](https://code.visualstudio.com/)
2. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4. Modify the VSCode user settings to add below configuration


    ```javascript
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true,
    "prettier.eslintIntegration": true
    ```
