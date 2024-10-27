import { Link, useLocation } from "react-router-dom"
import css from './MovieList.module.css'

const MovieList = ({ movies }) => {
    const location = useLocation();
    return(
    <ul>
        {movies.map((movie) => (
        <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} className={css.link} state={location}>{movie.title}</Link>
        </li>
            ))}
    </ul>)
}

export default MovieList