import { Outlet, Link } from "react-router-dom";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { logOut } from "../services/auth";

const Layout = (props) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    logOut()
    navigate('/');
  };

  const { isLoggedin } = props;
  console.log(isLoggedin)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a className="navbar-brand" href="#">Navbar</a> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!isLoggedin ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Profile <span className="sr-only">(current)</span></Link>
                </li>
              </>)
            }
            {isLoggedin &&
              <li className="nav-item active">
                <Link className="nav-link" to="/cart">Cart<span className="sr-only"></span></Link>
              </li>
            }

            {
              !isLoggedin &&
              <li className="nav-item active">
                <Link className="nav-link" to="/login">Cart<span className="sr-only"></span></Link>
              </li>
            }

            <li className="nav-item active">
              <Link className="nav-link" to="/order">Orders<span className="sr-only"></span></Link>
            </li>

            {!isLoggedin ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="/login">Login<span className="sr-only"></span></Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link" onClick={() => logoutHandler()}>logout<span className="sr-only"></span></Link>
                </li>
              </>)
            }

            <li className="nav-item active">
              <Link className="nav-link" to="/signup">SignUp<span className="sr-only"></span></Link>
            </li>
            <li className="nav-item dropdown">
              {/* <a classNameName="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a> */}
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <a className="dropdown-item" href="#">Action</a> */}
                {/* <a className="dropdown-item" href="#">Another action</a> */}
                <div className="dropdown-divider"></div>
                {/* <a className="dropdown-item" href="#">Something else here</a> */}
              </div>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link disabled" href="#">Disabled</a> */}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;