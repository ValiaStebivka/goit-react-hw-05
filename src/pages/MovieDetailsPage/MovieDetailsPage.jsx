import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getDataById } from '../../fetchArticles';
import { BackLink, Loader, ErrorMessage } from '../../components';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const data = await getDataById(movieId);
        setMovieData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BackLink to={backLinkHref}>Go back</BackLink>

      {loading && <Loader />}
      {error && <ErrorMessage />}

      <div className={css.detailsContent}>
        <div className={css.imageContent}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
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
          <Link to={`cast`} state={{ from: location }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to={`reviews`} state={{ from: location }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
