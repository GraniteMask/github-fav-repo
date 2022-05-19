import './App.css';
import {BrowserRouter, Route} from 'react-router-dom'
import FavoritePage from './FavoritePage';
import HomePage from './Homepage';

function App() {


  return (
    <BrowserRouter>
    
 
      <Route path="/favorite" exact component={FavoritePage} />
      <Route path="/" exact component={HomePage} />

    
    </BrowserRouter>
  );
}

export default App;
