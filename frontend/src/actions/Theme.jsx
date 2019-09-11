import {THEME_CHANGE} from '../constants/action-types'

const setThemeAction = (theme) => {

    //console.log(theme, "LLEGA COLRO oA ACTION")
    return {
      type: THEME_CHANGE,
      payload: theme
    }
  }

export default setThemeAction;