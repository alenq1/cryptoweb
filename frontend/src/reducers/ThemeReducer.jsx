import {THEME_CHANGE} from '../constants/action-types'

const initialState = {

  theme: {
    color: 'whitesmoke',
    textColor: 'black'
    
  }
}
const themeReducer = (state = initialState, action) => {

    
    //console.log(action.payload, "PAYLOAD PARA CAMBIAR")
    switch(action.type){
        case THEME_CHANGE: 
        
            return {
            ...state,
            theme: {...state.theme,
                      color: action.payload,
                      textColor: state.theme.color
              }
            };
        default:
            
            return state

    }
  }
  export default themeReducer;