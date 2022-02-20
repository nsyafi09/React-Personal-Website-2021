import React from 'react';  
import {Link} from 'react-router-dom'
import './Nav.css';

function Nav() {  
  return (  
    <nav className="navbar">
        <div ClassName="myname">Summer Project - Syafi</div>
        <ul className="list">
            <Link className="components" to="/">
                <li>Home</li>
            </Link>
            <Link className="components" to="/Container">
                <li>Canvas</li>
            </Link>
            <Link className="components" to="/Stories">
                <li>Stories</li>
            </Link>
            <Link className="components" to="/NewPost">
                <li>Tell A Story</li>
            </Link>
            <Link className="components" to="/About">
                <li>About</li>
            </Link>
        </ul>
    </nav>
  );  
}  
export default Nav; 