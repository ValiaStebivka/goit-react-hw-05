import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBox, Loader, ErrorMessage, MovieList} from '../components';
import { fetchData } from '../fetchArticles';

export default function Movies() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const movieName = searchParams.get('query') ?? '';

  const searchMovies = async query => {
    try {
      setError(false)
      setLoading(true);
      const result = await fetchData(query);
      setSearchResults(result.results);
      const nextParams = query !== '' ? { query } : {};
      setSearchParams(nextParams);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
console.log(searchResults)
  return (
    <>
      <SearchBox value={movieName} onSearch={searchMovies} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <div>
      <MovieList movies={searchResults} />
      </div>
    </>
  );
}
