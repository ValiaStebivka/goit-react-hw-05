import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBox, Loader, ErrorMessage, MovieList} from '../components';
import { fetchData } from '../fetchArticles';

export default function Movies() {
  const [searchResults, setSearchResults] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const movieName = searchParams.get('query') ?? '';

  useEffect(() => {
    const fetchDataInfo = async () => {
      setIsLoading(true)
      try {
        const data = await fetchData(movieName)
        setSearchResults(data.results)
      } catch (error) {
        setError(error)
      } finally {
      setIsLoading(false)
    }
  }
    fetchDataInfo()

  },[movieName])

  const searchMovies = async query => {
      const nextParams = query !== '' ? { query } : {};
      setSearchParams(nextParams);
  };
  return (
    <>
      <SearchBox value={movieName} onSearch={searchMovies} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div>
        {searchResults.length > 0 && <MovieList movies={searchResults} /> }
      </div>
    </>
  );
}
