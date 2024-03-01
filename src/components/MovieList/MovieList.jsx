import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export const MovieList = ({movies}) => {

    const location = useLocation()

    return movies.map(movie => (
          <Link key={movie.id} to={`/movies/${item.id}`} state={{ from: location }}>
            <li>{movie.title}</li>
          </Link>
        )) 
}
