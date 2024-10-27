import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMovies } from "../../movies-api"
import css from './MovieReviews.module.css'

const MovieReviews = () => {
    const { movieId } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        if (!movieId) return;
        async function fetchMoviesData() {           
            try {
                setIsLoading(true);
                const result = await fetchMovies({ fetchType: `movie/${movieId}/reviews` });
                setReviews(result.results);
                
            } catch (error) {
                console.log(error);                
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchMoviesData();
    }, [movieId]);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : reviews.length === 0 ? (
                <p>We don&apos;t have any reviews for this movie</p>
            ) : (
                <ul className={css.reviews}>
                    {reviews.map((review) => (
                        <li key={review.id} className={css.review}>
                            <p className={css.author}>{review.author}</p>
                            <p className={css.content}>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default MovieReviews