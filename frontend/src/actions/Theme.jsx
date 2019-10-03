import { THEME_CHANGE } from '../constants/action-types'

const setThemeAction = (theme) => {

  console.log(theme, "LLEGA VALOR DE THEME")
  return {
    type: THEME_CHANGE,
    payload: theme === 'light' ? 'dark' : 'light'
  }
}

export default setThemeAction;