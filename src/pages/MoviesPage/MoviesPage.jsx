import { useSearchParams } from "react-router-dom"
import { useEffect,useState } from "react"
import { fetchMovies } from "../../movies-api"
import css from './MoviesPage.module.css'
import MovieList from '../../components/MovieList/MovieList'
import SearchForm from '../../components/SearchForm/SearchForm'

const MoviesPage = () => { 
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();     

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        setIsLoading(true);        
        const result = await fetchMovies({fetchType: 'search/movie', params: {query: searchParams.get('query')}});
        setMovies(result.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMoviesData();
  }, [searchParams]);

  const onSearchHandler = (event) => {
    event.preventDefault()   
    const searchInput = event.target.elements.searchInput.value.trim()    
    if (!searchInput) {
      return
    }
    searchParams.set('query', searchInput)
    setSearchParams(searchParams)
    event.target.reset()
  }
    return (
      <>       
         <header className={css.SearchBar}>
          <SearchForm onSearchHandler={onSearchHandler} value={searchParams.get('query')} />
        </header>
        <hr />
        {isLoading && <p>Loading...</p>}
        <MovieList movies={movies}/>     
      </>)
}

export default MoviesPage