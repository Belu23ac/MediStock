import logo from "../../assets/medistock-logo-transparent.svg";
import { Outlet, NavLink, useOutlet } from "react-router-dom";
import "./home.css";

const Home = () => {
  const outlet = useOutlet();

  return (
    <div id="home" className="home-container">
      {!outlet && (
        <>
      <div className="logo-container">
        <img alt="MediStock Logo" src={logo} className="home-logo" />
      </div>
      <div className="navlink-container">
        <NavLink to="activeOrders" className="home-navlink">
          <h2>Aktive Ordre</h2>
        </NavLink>
        <NavLink to="orderHistory" className="home-navlink">
          <h2>Ordre Historik</h2>
        </NavLink>
      </div>
      <NavLink to="scanOrder" className="home-scan-link">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="scan-icon"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        <h2 className="scan-text">Scan Varer</h2>
      </NavLink>
      </>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
