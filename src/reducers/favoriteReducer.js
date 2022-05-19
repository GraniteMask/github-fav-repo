import { FAVORITE_FAIL, FAVORITE_REQUEST, FAVORITE_SUCCESS } from "../constants/constants";

export const favoriteReducer = (state={loading: true}, action) =>{
    switch(action.type){
        case FAVORITE_REQUEST:
            return {...state, loading: true}
        case FAVORITE_SUCCESS:
            // const item = action.payload
            return {...state, loading: false, favorite: action.payload}
        case FAVORITE_FAIL:
            return {...state, loading: false, error:action.payload}
        default:
            return state
    }
    
}