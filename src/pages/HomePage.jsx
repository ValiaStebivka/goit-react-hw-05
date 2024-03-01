import { useState, useEffect } from 'react';
import { fetchPopular } from '../fetchArticles';
import { MovieList } from '../components';

export default function Home () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchPopular();
        setData(result.results);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={data} />
    </div>
  );
}
