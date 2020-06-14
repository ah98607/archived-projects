import React from "react";
const Search = props =>
    <form>
    <div className="form-group">
        <input
            onChange={props.handleInputChange}
            value={props.topic}
            name="topic"
            type="text"
            className="form-control"
            placeholder="Topic"
            id="topic"
        />
        <input
            onChange={props.handleInputChange}
            value={props.startYear}
            name="startYear"
            type="text"
            className="form-control"
            placeholder="Start Year"
            id="startYear"
        />
        <input
            onChange={props.handleInputChange}
            value={props.endYear}
            name="endYear"
            type="text"
            className="form-control"
            placeholder="End Year"
            id="endYear"
        />
        <br />
        <button onClick={props.handleFormSubmit} className="btn btn-primary">
        Search Top 5 News in New York Times Database
        </button>
    </div>
    </form>;
export default Search;