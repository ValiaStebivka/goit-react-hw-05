import { Link } from 'react-router-dom';
import css from './NotFound.module.css';

export default function NotFound() {
  return (
    <div>
      This page doesn't exist. Go to the{' '}
      <Link className={css.link} to="/">
        Home page
      </Link>
    </div>
  );
}
