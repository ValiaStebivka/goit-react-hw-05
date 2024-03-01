import { useState, useEffect } from 'react';
import { fetchPopular } from '../fetchArticles';
import { ErrorMessage, Loader, MovieList } from '../components';

export default function Home () {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchPopular();
        setData(result.results);
      } catch (error) {
        setError(error)
      }
      finally {
        setIsLoading(false)
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {data.length > 0 && <MovieList movies={data} />}
    </div>
  );
}
