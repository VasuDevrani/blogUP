import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="Nav">
      <form className="searchform" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" style={{color: 'white', marginRight: '20px', marginLeft: '10px'}}>Search Posts</label>
        <input
          type="text"
          id="search"
          placeholder="Search Posts"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          style={{padding: '10px', textAlign: 'center'}}
        />
      </form>
      <ul>
          <li><Link to ='/'>Home</Link></li>
          <li><Link to ='Post'>Post</Link></li>
          <li><Link to ='About'>About</Link></li>
      </ul>
    </nav>
  );
}
