import { FAVORITE_FAIL, FAVORITE_REQUEST, FAVORITE_SUCCESS } from "../constants/constants";

export const favoriteRepo = (info) => async(dispatch) =>{
    dispatch({ type: FAVORITE_REQUEST })
    try{
        dispatch({type: FAVORITE_SUCCESS, payload: info})
    }catch(error){
        dispatch({type: FAVORITE_FAIL, payload:error.message})
    }
}