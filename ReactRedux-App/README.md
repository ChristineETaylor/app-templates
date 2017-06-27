# Redux Requirements

### package.json
```js
  "dependencies": {
    "react-redux": "^5.0.5",
    "redux": "^3.6.0",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.2.0",
    "seamless-immutable": "^7.1.2"
  },
```

### Create the store in top level component

```js
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './store/reducers';

const middleware = [thunk, createLogger()];
// createLogger can be turned off for production

const store = createStore(
  reducer,
  applyMiddleware(...middleware),

  // following is for Redux dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  // Wrap component in the Provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));

```


### "Smart" component = "Container"

```js

import { connect } from 'react-redux';

// Import actions for dispatch
import { saveText, clearText, saveText2, clearText2 } from '../store/actions';

// Example dispatch
const { dispatch } = this.props;
dispatch(saveText(this.state.input1));

// Get state from redux
function mapStateToProps(state) {
  const { input1State, input2State } = state;
  const { text1 } = input1State;
  const { text2 } = input2State;
  return {
    text1,
    text2,
  };
}

export default connect(mapStateToProps)(App);

```

### Sample Action Type, Action, and Reducer

**Action Type**

```js
export const SAVE_TEXT = 'SAVE_TEXT';
```

**Action**

```js
import * as types from './actionTypes';

export const saveText = text => ({
  type: types.SAVE_TEXT,
  text,
});
```

**Reducer**

```js

import { combineReducers } from 'redux';
import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const input1State = (state = Immutable({
  text1: '',
}), action) => {
  switch (action.type) {
    case types.SAVE_TEXT: {
      return Immutable({
        text1: action.text,
      });
    }
    case types.CLEAR_TEXT: {
      return Immutable({
        text1: '',
      });
    }
    default:
      return state;
  }
};

// NOTE: input2State omitted

const rootReducer = combineReducers({
  input1State,
  input2State,
});

export default rootReducer;
```


---

# Minimum React App Requirements:

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
  "presets": ["latest", "react", "stage-2"]
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