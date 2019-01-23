import Types from '../../action/types'

const  defaultState = {
    theme:'blue',
};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.THEME_CHANGE:{

            // return {theme:action.theme, ...state} = state;

            return {
                ...state,
                theme: action.theme,
            }
        }
        default:
        return state;
    }
  
}

