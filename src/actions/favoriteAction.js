import { FAVORITE_FAIL, FAVORITE_REQUEST, FAVORITE_SUCCESS } from "../constants/constants";

export const favoriteAction = (info) => async(dispatch) =>{
    dispatch({ type: FAVORITE_REQUEST })
    try{
        dispatch({type: FAVORITE_SUCCESS, payload: info})
        localStorage.setItem('favorite-repo', JSON.stringify(info))
    }catch(error){
        dispatch({type: FAVORITE_FAIL, payload:error.message})
    }
}