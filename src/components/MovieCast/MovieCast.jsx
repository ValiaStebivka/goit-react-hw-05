import { useState, useEffect } from 'react';
import { getCast } from '../../fetchArticles';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';
import { Loader } from '../Loader';

export default function MovieCast() {
  const { movieId } = useParams();
  const [castData, setCastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchCastData();
  }, [movieId]);


  return (   
    <div>
      {isLoading && <Loader />}
      {error && <p> Something went wrong ... </p> }
      <h3>Movie Cast</h3>
      <ul>
        {castData.map(actor => (
          <li className={css.card} key={actor.id}>
            <img
              className={css.image}
              src={ profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : defaultImg}
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
