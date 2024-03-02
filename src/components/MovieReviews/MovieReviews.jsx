import { useState, useEffect } from 'react';
import { getReviews } from '../../fetchArticles';
import { useParams } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsData, setReviewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const data = await getReviews(movieId);

        if (data && data.results) {
          setReviewsData(data.results);
        } else {
          setReviewsData([]);
        }

        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchReviewsData();
  }, [movieId]);


  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      <h3 className={css.title}>Movie Reviews</h3>
      <ul>
        {reviewsData.length > 0 ? (
          reviewsData.map(review => (
            <li className={css.card} key={review.id}>
              <p className={css.author}>{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>We don't have any reviews for this movie.</p>
        )}
      </ul>
    </div>
  );
}
