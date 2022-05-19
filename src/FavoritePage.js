import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepo } from './actions/searchActions';
import { favoriteAction } from './actions/favoriteAction';
import { useHistory } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

function FavoritePage() {
  const favoriteRepo = useSelector(state=> state.favoriteRepo)
  const {favorite} = favoriteRepo
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('')
  const [favoriteArr, setFavoriteArr] = useState([])
  const [searchResult, setSearchResult] = useState([])
  let history = useHistory()

  useEffect(()=>{
    setFavoriteArr(JSON.parse(localStorage.getItem('favorite-repo')) != undefined ? JSON.parse(localStorage.getItem('favorite-repo')) : [])
  },[])

  useEffect(() =>{
    setSearchResult([])
    var tempResult = []
    if(searchQuery != ''){
      for(var i=0; i<favoriteArr.length; i++){
        if(favoriteArr[i].full_name.toLowerCase().includes(searchQuery.toLowerCase())){
          console.log(favoriteArr[i])
          tempResult.push(favoriteArr[i])
          setSearchResult(tempResult)
        }
      }
    }
  },[searchQuery])

  console.log(searchResult)

  useEffect(()=>{
    // if(favoriteArr[favoriteArr.length-1])
    if(favoriteArr.length !=0){
      dispatch(favoriteAction(favoriteArr))
    }
    
  },[favoriteArr])


  const handleDelete = (id) =>{
    var tempArray = new Array()
    for(var i=0; i<favoriteArr.length; i++){
      if(favoriteArr[i].id != id){
        tempArray.push(favoriteArr[i])
      }
    }
    console.log(tempArray)
    
    setFavoriteArr(tempArray)
    if(tempArray.length == 0){
      tempArray = []
    }
    localStorage.setItem('favorite-repo', JSON.stringify(tempArray))
  }

  const handleDeleteAfterSearch = (id) =>{
    var tempArray = new Array()
    for(var i=0; i<favoriteArr.length; i++){
      if(favoriteArr[i].id != id){
        tempArray.push(favoriteArr[i])
      }
    }
    console.log(tempArray)
    
    setFavoriteArr(tempArray)
    if(tempArray.length == 0){
      tempArray = []
    }
    localStorage.setItem('favorite-repo', JSON.stringify(tempArray))
    setSearchResult([])
  }

  console.log(favoriteArr)

  const exportFunc = () =>{
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(favoriteArr)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "favoriteRepoBackup.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const importFunc = async (e) =>{
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      localStorage.setItem('favorite-repo', text)
      setFavoriteArr(JSON.parse(text))
    };
    reader.readAsText(e.target.files[0])
  }

  return (
    <div className="App">
      <h1 style={{marginTop: "6rem", fontSize: "3rem"}}>Your Favorite Repositories</h1>
      <div className="wrapper">
        
        <div className="input-group">
          <div class="input-container ic1">
            <input className="input" type="text" name="search_item" onChange={(e)=>setSearchQuery(e.target.value)} placeholder=" "/>
            <div className="cut"></div>
            <label for="search_item" className="placeholder">Enter Name</label>
          </div>
        </div>
      </div>

      <button className="fav-button" style={{marginTop: "1.5rem"}} onClick={()=>history.push('/')}>Go back to search page</button>
      <button className="fav-button" style={{marginTop: "1.5rem"}} onClick={()=>exportFunc()}>Export</button>
      <input className="fav-button" style={{marginTop: "1.5rem"}} onChange={(e)=>importFunc(e)} type="file" label="Import"/>
      {/* <CSVDownload data={csvData} target="_blank" />; */}
    <div className="search_results_div">
    {
      favoriteArr.length != 0 ?
      (<>
        <h2 style={{marginTop: "1rem"}}>Your Favorite Repositories</h2>
        {
            searchResult.length == 0 ? favoriteArr.length != 0 && favoriteArr.map((each,i)=>
            (<>
            <h4>{i+1}. <a href={each.html_url} style={{textDecoration: "none", color: "rgb(206, 201, 201)"}}><span style={{fontWeight: "bold", color: '#dc2f55'}}>{each.full_name}</span></a> by <span style={{fontWeight: "bold"}}>{each.owner.login}</span> ({each.stargazers_count} stars)</h4>
            <button className="fav-button" onClick={()=>handleDelete(each.id)}>Delete from Favorites</button>
            </>))
            :
            searchResult.map((each,i)=>(<>
              <h4>{i+1}. <a href={each.html_url} style={{textDecoration: "none", color: "rgb(206, 201, 201)"}}><span style={{fontWeight: "bold", color: '#dc2f55'}}>{each.full_name}</span></a> by <span style={{fontWeight: "bold"}}>{each.owner.login}</span> ({each.stargazers_count} stars)</h4>
              <button className="fav-button" onClick={()=>handleDeleteAfterSearch(each.id)}>Delete from Favorites</button>
            </>))
        }
      </>)
      :(
        <h2 style={{ marginTop: "16rem"}}>Sorry No favorite Repositories added.</h2>
      )
    }
    
    
    </div>
    
      

    </div>
  );
}

export default FavoritePage;
