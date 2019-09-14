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
import coinChangeReducer from './reducers/coinChangeReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  themeReducer,
  apiDataReducer,
  newsReducer,
  chartReducer,
  walletsReducer,
  explorerReducer,
  coinChangeReducer
})
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  storeEnhancers(applyMiddleware(thunk))
)

export default store