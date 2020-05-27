import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
// import Demo from './text.js';
import { Provider } from 'react-redux';
import store from './redux/store.js';
window.vtk.GlobalOptions.LOGO_URL = './images/yorktallogo.png'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
