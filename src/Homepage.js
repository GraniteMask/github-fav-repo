import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo } from './actions/searchActions';
import { favoriteAction } from './actions/favoriteAction';


function HomePage() {
  const searchResults = useSelector(state=> state.searchResults)
  const favoriteRepo = useSelector(state=> state.favoriteRepo)
  const {loading, error, results} = searchResults
  const {favorite} = favoriteRepo
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [favoriteArr, setFavoriteArr] = useState([])

  useEffect(()=>{
    setFavoriteArr(JSON.parse(localStorage.getItem('favorite-repo')) ? JSON.parse(localStorage.getItem('favorite-repo')) : [])
  },[])

  useEffect(() =>{
    dispatch(searchRepo(searchQuery))
  },[searchQuery])


  if(results){
    console.log(results)
  }

  useEffect(()=>{
    // if(favoriteArr[favoriteArr.length-1])
    if(favoriteArr.length !=0){
      dispatch(favoriteAction(favoriteArr))
    }
    
  },[favoriteArr])

  const handleFavorite = (each) =>{
    setFavoriteArr(arr=>[...arr, each])
    
  }

  const handleDelete = (id) =>{
    setFavoriteArr(arr=>[...arr, arr.filter(x=>x.id !== id)])
  }

  console.log(favoriteArr)

  return (
    <div className="App">
      <h1 style={{marginTop: "6rem", fontSize: "3rem"}}>Search GitHub Repositories</h1>
      <div className="wrapper">
        
        <div className="input-group">
          <div class="input-container ic1">
            <input className="input" type="text" name="search_item" onChange={(e)=>setSearchQuery(e.target.value)} placeholder=" "/>
            <div className="cut"></div>
            <label for="search_item" className="placeholder">Search</label>
          </div>
        </div>
      </div>

    
          <div className="search_results_div">
            <h2 style={{marginTop: "1rem"}}>Your Search Results</h2>
            {
              results != undefined && results.items.map((each,i)=>(<>
                <h4>{i+1}. <a href={each.html_url} style={{textDecoration: "none", color: "rgb(206, 201, 201)"}}><span style={{fontWeight: "bold", color: '#dc2f55'}}>{each.full_name}</span></a> by <span style={{fontWeight: "bold"}}>{each.owner.login}</span> ({each.stargazers_count} stars)</h4>
                <button className="fav-button" onClick={()=>handleFavorite(each)}>Add to Favorite</button>
                </>))
            }
          </div>

      

    </div>

  );
}
// Object.keys(results).length === 0 && results.constructor === Object ) == false

export default HomePage;
