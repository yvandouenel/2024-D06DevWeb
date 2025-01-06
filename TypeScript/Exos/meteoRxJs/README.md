# Intialisation du projet 
```bash
mkdir mon-projet
cd mon-projet
npm init -y
```
# Installation des dépendances

```bash
npm install --save-dev typescript ts-loader webpack webpack-cli webpack-dev-server html-webpack-plugin @types/node rxjs
```

#Modification de package.json
```json
{
  "name": "Metéo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "devDependencies": {
    "@types/node": "^22.10.5",
    "html-webpack-plugin": "^5.6.3",
    "ts-loader": "^9.5.1",
    "typescript": "^5.7.2",
    "webpack": "^5.97.1",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.0"
  },
  "dependencies": {
    "rxjs": "^7.8.1"
  }
}
```
# Création de webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};

```
# Création de tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```
# Création de src/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>TypeScript Webpack App</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>

```
# Création de src/index.ts

```ts
console.log(`Dans index.ts`);

```
# Lancer le serveur de développement :
```bash
npm start

```
# Construire l'application pour la production 
```bash
npm run build
```