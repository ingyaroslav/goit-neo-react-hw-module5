import { useEffect, useState, useRef, Suspense } from "react"
import { Outlet, useParams, NavLink, Link, useLocation } from "react-router-dom"
import { fetchMovies } from "../../movies-api"
import css from './MovieDetailsPage.module.css'
import clsx from 'clsx';

const defaultImg = 'https://64.media.tumblr.com/f82c91bc52cea0c51767e750fec1e498/tumblr_inline_oxtqw8R5Lw1uxn7zu_540.pnj'

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const location = useLocation();
    const backLink = useRef(location.state ?? '/movies');
       
    useEffect(() => {
        async function fetchMoviesData() {            
            try {
                setIsLoading(true);
                const result = await fetchMovies({ fetchType: `movie/${movieId}` });
                setMovie(result);               
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMoviesData();
    }, [movieId]);

    return (
        <>
            <Link to={backLink.current} className={clsx(css.link, css.linkBack)}>Go back</Link>
            {isLoading && <p>Loading...</p>}
            <div className={css.container}>
                <img src={
                movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: defaultImg}
                width={250}
                alt="poster"
                />
                <div className={css.wrapper}>
                    <h1 className={css.title}>{movie.title}</h1>
                    <p>{`User Score: ${movie.vote_average}`}</p>
                    <div className={css.overview}>
                        <p className={css.overviewtitle}>Overview</p>
                        <p className={css.overviewtext}>{movie.overview}</p>
                    </div>
                    <div className={css.genres}>
                        <p className={css.genrestitle}>Genres</p>
                        <p>{movie.genres && movie.genres.map(genre => genre.name).join(', ')}</p>
                    </div>       
                </div>
            </div>
            <hr/>
            <div className={css.info}>                 
                <p>Additional information</p>
                <ul>
                    <li><NavLink to="cast" className={buildLinkClass}>Cast</NavLink></li>
                    <li><NavLink to="reviews" className={buildLinkClass}>Reviews</NavLink></li>
                </ul>
            </div>
            <hr />
            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense>
        </>)
}

export default MovieDetailsPage