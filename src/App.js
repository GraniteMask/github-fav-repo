import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo } from './actions/searchActions';
import { favoriteAction } from './actions/favoriteAction';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import FavoritePage from './FavoritePage';
import HomePage from './Homepage';

function App() {


  return (
    <BrowserRouter>
    
 
      <Route path="/favourite" exact component={FavoritePage} />
      <Route path="/" exact component={HomePage} />

    
    </BrowserRouter>
  );
}

export default App;
