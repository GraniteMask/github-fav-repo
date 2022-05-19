import { SEARCH_SUCCESS, SEARCH_FAIL, SEARCH_REQUEST } from "../constants/constants";

export const searchReducer = (state={loading: true}, action) =>{
    switch(action.type){
        case SEARCH_REQUEST:
            return {...state, loading: true}
        case SEARCH_SUCCESS:
            return {...state, loading: false, results: action.payload}
        case SEARCH_FAIL:
            return {...state, loading: false, error:action.payload}
        default:
            return state
    }
    
}