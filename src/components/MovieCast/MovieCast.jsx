import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMovies } from "../../movies-api"
import css from './MovieCast.module.css'

const defaultImg = 'https://64.media.tumblr.com/f82c91bc52cea0c51767e750fec1e498/tumblr_inline_oxtqw8R5Lw1uxn7zu_540.pnj'
  
const MovieCast = () => {
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        if (!movieId) return;
        async function fetchMoviesData() {            
            try {
                setIsLoading(true)
                const result = await fetchMovies({ fetchType: `movie/${movieId}/credits` });
                setCast(result.cast);
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
            {isLoading ? (
                <p>Loading...</p>
            ) : cast.length === 0 ? (
                <p>We don&apos;t have any cast actors for this movie</p>
            ) : (
                <ul className={css.cast}>
                    {cast.map((actor) => (
                        <li key={actor.id} className={css.castItem}>
                            <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImg} alt={actor.name} className={css.castImg} />
                            <p>{actor.name}</p>
                        </li>
                    ))}
                </ul>)}
        </>
    )       
}

export default MovieCast