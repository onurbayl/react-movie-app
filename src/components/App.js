import React from "react";
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";


class App extends React.Component {
    state = {
        movies: [],
        searchQuery: ""
    }

    componentDidMount = async () => {
        const baseUrl = 'http://localhost:3002/movies';
        const response = await fetch(baseUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json();
        this.setState({ movies: data });

    }


    deleteMovie = async (movie) => {
        const baseUrl = `http://localhost:3002/movies/${movie.id}`;
        await fetch(baseUrl, {
            method: 'DELETE'
        })
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id //returne gerek yok çünkü süslü parantez yok
        )

        this.setState({
            movies: newMovieList
        })
    }

    searchMovie = (event) => {
        this.setState({ searchQuery: event.target.value })
    }

    addMovie = async (movie) => {
        await axios.post(`http://127.0.0.1:3002/movies`, movie);
        this.setState({movies: this.state.movies.concat([movie]).reverse()});
    }

    editMovie = async (id, movie) => {
        await axios.put(`http://127.0.0.1:3002/movies/${id}`, movie);
        
    }
    
    render() {
        let filteredMovies = this.state.movies.filter(
            movie => movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        ).sort((a,b) => {
            return b.id - a.id ;
        })

        return (
            <Router>

                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<><SearchBar searchMovieProp={this.searchMovie}/><MovieList movies={filteredMovies} deleteMovieProp={this.deleteMovie}/></>}></Route>
                        <Route path="/add" element={<AddMovie onAddMovie={(movie) => {this.addMovie(movie)}} />} />
                        <Route path="/edit/:id" element={<EditMovie onEditMovie={(id, movie) => {this.editMovie(id, movie)}} />} />
                        
                    </Routes>
                </div>

            </Router>
        )
    }
}


export default App;