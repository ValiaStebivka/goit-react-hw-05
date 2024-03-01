import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getDataById } from '../../fetchArticles';
import { BackLink, Loader, ErrorMessage } from '../../components';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location?.state?.from ?? '/Home');

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        const data = await getDataById(movieId);
        setMovieData(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return (
    <>
      <BackLink to={backLinkHref.current}>Go back</BackLink>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {movieData && <div> <div className={css.detailsContent}>
        <div className={css.imageContent}>
          <img
            className={css.image}
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : defaultImg}
            alt={movieData.title}
          />
        </div>
        <div className={css.textContent}>
          <h2 className={css.title}>{movieData.title}</h2>

          <h3>User Score:</h3>
          <p className={css.score}>{movieData.vote_average}</p>

          <h3>Overview:</h3>
          <p className={css.overview}>{movieData.overview}</p>

          <h3>Genres:</h3>
          {movieData.genres && (
            <p>{movieData.genres.map(genre => genre.name).join(', ')}</p>
          )}
        </div>
      </div>
      <h3 className={css.addInfo}>Additional information</h3>
      <ul className={css.details}>
        <li>
          <Link to={`cast`} >
            Cast
          </Link>
        </li>
        <li>
          <Link to={`reviews`} >
            Reviews
          </Link>
        </li>
      </ul> </div>
}
      
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
