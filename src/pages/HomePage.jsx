import { useState, useEffect } from 'react';
import { fetchPopular } from '../fetchArticles';
import { Link, useLocation } from 'react-router-dom';

export default function Home () {
  const [data, setData] = useState([]);
  const location = useLocation();

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
      {data.map(item => (
        <Link
          key={item.id}
          to={`/movies/${item.id}`}
          state={{ from: location }}
        >
          <li>{item.title}</li>
        </Link>
      ))}
    </div>
  );
}
