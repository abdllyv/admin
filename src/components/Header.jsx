import { useContext } from "react";

// Context
import { AuthContext } from "../utils/AuthContext";

// Router
import { Link, NavLink } from "react-router-dom";

// Images
import logo from "../assets/images/logo.webp";

// Icons
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  // Global states
  const { token } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="navBar">
            {token && (
              <ul className="navList">
                <li className="navItem">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/all-cars">All Cars</NavLink>
                </li>
                <li className="navItem">
                  <NavLink to="/create-car">Add new car</NavLink>
                </li>
              </ul>
            )}
          </nav>
          <div className="userArea">
            {token ? (
              <button className="logOut">
                LOG OUT
                <FaSignOutAlt />
              </button>
            ) : (
              <Link className="login" to="/login">
                <FaUserCircle />
                <span>LOG IN</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
