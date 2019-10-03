import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import themeReducer from './reducers/ThemeReducer'
import apiDataReducer from './reducers/apiDataReducer'
import newsReducer from './reducers/newsReducer'
import chartReducer from './reducers/chartReducer'
import walletsReducer from './reducers/walletsReducer'
import explorerReducer from './reducers/explorerReducer'
import xChangeReducer from './reducers/xChangeReducer'
import WSocketReducer from './reducers/WSocketReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  theme: themeReducer,
  apiData: apiDataReducer,
  news: newsReducer,
  chart: chartReducer,
  wallets: walletsReducer,
  explorer: explorerReducer,
  xchange: xChangeReducer,
  WSocket: WSocketReducer
})
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  storeEnhancers(applyMiddleware(thunk))
)

export default store