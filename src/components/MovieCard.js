// import logo from '../images/star-wars.png';
import './MovieCard.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const movieData = "https://swapi.dev/api/films";

const MovieCard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     const getMovie = async () => {
      try{
       const response = await axios.get(movieData);
      //  console.log(response.data.results);
       setData(response.data.results);
       setError(null);
      }
      catch(err){
        setError(err.message);
        setData(null);
      }
      finally{
        setLoading(false);
      }
     }

     getMovie();
  },[])

  return (
    
    <div>
      <h1 className='star-wars-logo'>STAR WARS</h1>
      {loading && <div className='loading-icon'>
         <i class="bi bi-arrow-clockwise"></i>
      </div>}
      {error && <div>{`There seems to be a problem fetching this data - ${error}`}</div>}
      
      <div className='movie'>
        {data && data.map((item) => {
          return (
            
          <div className='movie-container' key={item.episode_id}>
            <div class="movie-text">
            <div className='movie-title'>
              <h3 className='title'>{item.title}</h3>
              <span className='date-text'>{
                new Date(item.release_date).toLocaleDateString("en-US", {month:'long', day:'numeric', year:'numeric'})
              }</span>
            </div>
            <p className='movie-description'>
                {item.opening_crawl.substring(0,260)}...
              </p>
              <p className='more-button'>
                <a href='##'>More Info</a>
              </p>
            </div>
            </div>
            )
          })
          
        }
      </div>
    </div>
  )
}

export default MovieCard