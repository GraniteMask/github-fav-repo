import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { favoriteReducer } from "./reducers/favoriteReducer";
import { searchReducer } from "./reducers/searchReducers";

const initialState ={
    result: [],
    favorite: localStorage.getItem('favorite-repo') ? JSON.parse(localStorage.getItem('favorite-repo')) : []
}

const reducer = combineReducers({
    searchResults: searchReducer,
    favoriteRepo: favoriteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store