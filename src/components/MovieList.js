import React from "react";
import {Link} from "react-router-dom"

const MovieList = (props) => {

    const trunc = (arr, max) => {
        let str = arr[0];
        let i = 1;
        while (i < max && i < arr.length) {
            str = str.concat(" ", arr[i])
            i++;
        }
        if (i === arr.length) {
            return str;
        }
        return str + " ...";

    }
    return (
        <div className="row">
            {props.movies.map((movie, i) => (
                <div className="col-lg-4" key={i}>
                    <div className="card mb-4 shadow-sm">
                        <img src={movie.imageURL} className="card-img-top img-fluid" alt={movie.name} />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">{trunc(movie.overview.split(' '), 50)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="button" onClick={(event) => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                <Link to={`/edit/${movie.id}`} type="button" className="btn btn-md btn-outline-primary">Edit</Link>
                                <h2><span className="alert alert-info">{movie.rating}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}

export default MovieList;