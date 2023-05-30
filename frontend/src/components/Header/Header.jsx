import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [navState, setNavState] = useState(false);

  const changeNavState = () => {
    if (navState){
      document.body.style.overflowY = 'scroll';
    }
    else{
      document.body.style.overflowY = 'hidden';
    }
    setNavState(!navState)
  }

  return (
    <div className={"Header-container" + (navState ? " opened" : " closed")}>
      <div id="content-blocker" style={{display: (navState ? "block" : "none")}}></div>
      <div id="nav">

        <div id="nav-controller">
          <div className={"hamburger" + (navState ? " opened" : " closed")} onClick={changeNavState}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="nav-links">
          <Link className="Link" to="/" onClick={changeNavState}>
            Home
          </Link>
          <Link className="Link" to="/research" onClick={changeNavState}>
            Research
          </Link>
          <Link className="Link" to="/users" onClick={changeNavState}>
            Users
          </Link>
          <Link className="Link" to="/about" onClick={changeNavState}>
            About
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
