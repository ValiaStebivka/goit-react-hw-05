import { useState, useEffect } from 'react';
import { getCast } from '../../fetchArticles';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastData = async () => {
      try {
        const data = await getCast(movieId);
        if (data && data.cast) {
          setCastData(data.cast);
        } else {
          setCastData([]);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCastData();
  }, [movieId]);

  if (loading) return <div>Loading cast data...</div>;
  if (error) return <div>We don't have any cast for this movie.</div>;

  return (
    <div>
      <h3>Movie Cast</h3>
      <ul>
        {castData.map(actor => (
          <li className={css.card} key={actor.id}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <h4>{actor.name}</h4>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
