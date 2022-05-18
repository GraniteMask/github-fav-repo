import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { searchReducer } from "./reducers/searchReducers";

const initialState ={
    result: [],
    favorite: localStorage.getItem('favorite-repo') ? JSON.parse(localStorage.getItem('favorite-repo')) : []
}

const reducer = combineReducers({
    searchResults: searchReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store