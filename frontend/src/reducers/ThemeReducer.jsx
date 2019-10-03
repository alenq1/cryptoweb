import { THEME_CHANGE } from '../constants/action-types'
import { Themes } from '../services/apisources'

const initialState = {

  theme: Themes['light']
}
const themeReducer = (state = initialState, action) => {


  //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
  switch (action.type) {
    case THEME_CHANGE:

      return {
        ...state,
        theme: Themes[action.payload]
      };
    default:

      return state

  }
}
export default themeReducer;