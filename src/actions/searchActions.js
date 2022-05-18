import axios from "axios";
import { SEARCH_SUCCESS, SEARCH_FAIL, SEARCH_REQUEST } from "../constants/constants";

export const searchRepo = (query) => async(dispatch) =>{
    dispatch({ type: SEARCH_REQUEST })
    try{
        const {data} = await axios.get(`https://api.github.com/search/repositories?q=${query}`)
        dispatch({type: SEARCH_SUCCESS, payload: data})
    }catch(error){
        dispatch({type: SEARCH_FAIL, payload:error.message})
    }
}