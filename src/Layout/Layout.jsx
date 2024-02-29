import { Outlet, NavLink } from 'react-router-dom';
import css from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <header className={css.header}>
        <div className={css.headerContent}>
          <NavLink className="link" to="/">
            Home
          </NavLink>
          <NavLink className="link" to="/movies">
            Movies
          </NavLink>
        </div>
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
