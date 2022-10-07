import React from "react";
import {Link} from "react-router-dom"

class SearchBar extends React.Component {

    handleFormSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-row mb-5 row">
                            <div className="col-10">
                                <input type="text" 
                                    onChange={this.props.searchMovieProp} 
                                    className="form-control" 
                                    placeholder="Search" 
                                /> 
                            </div>
                            <div className="col-2">
                                <Link to="/add" type="button" className="btn btn-md btn-danger" style={{float:'right'}}>Add Movie</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;