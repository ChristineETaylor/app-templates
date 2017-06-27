# Minimum React App  Requirements:

### package.json
```js
  "scripts": {
    "start": "node server/index.js",
    "start:dev": "webpack-dev-server --inline --hot",
    "build:dev": "webpack --watch",
    "build:prod": "webpack -p"
  },
  "devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-loader": "^7.1.0",
    "babel-preset-latest": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "css-loader": "^0.28.4",
    "html-webpack-plugin": "^2.29.0",
    "style-loader": "^0.18.2",
    "webpack": "^3.0.0",
    "webpack-dev-server": "^2.5.0"
  },
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
  }
```

package | description
---|---
babel | JS "transpiler", converts styles of JS (e.g. ES6, JSX) to browser-compatible ES5 JS
babel-presets | a set of plugins used to support particular language features
css-loader | loads / imports the CSS file
style-loader | takes the CSS and inserts the styling into the page
html-webpack-plugin | generates the dist index.html file, for example adds the script tag for the bundle.js

### .babelrc
- Specifies the babel presets: language rules supported

```
{
  "presets": ["latest", "es2015", "react", "stage-2"]
}
```

### webpack.config.babel.js

```js
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config = {
  entry: './client/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-2'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './client/src/index.html'),
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 1337,
    overlay: {
      warnings: true,
      errors: true,
    },
    hot: true,
  },
};

export default config;

```