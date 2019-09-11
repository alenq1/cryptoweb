import React from 'react'
import { createBrowserHistory } from 'history';

import {Provider} from 'react-redux'
import store from '../src/store'
import 'bootstrap/dist/css/bootstrap.css';
import Home from './layout/Main'
import Main from './layout/Main'
import News from './pages/News'
import Charts from './pages/Charts'





const App = () => {

  return (
    <Provider store={store}>
      <Main/>
    </Provider>
)
}

export default App
