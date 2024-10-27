import { useEffect, useState } from 'react'
import { fetchMovies } from '../../movies-api'
import MovieList from '../../components/MovieList/MovieList'

const HomePage = () => { 
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMoviesData() {
    try {
      setIsLoading(true);
      const result = await fetchMovies();     
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false);
      }
  }
  fetchMoviesData();
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {isLoading && <p>Loading...</p>}  
      <MovieList movies={movies}/>
    </>
  )
}

export default HomePage