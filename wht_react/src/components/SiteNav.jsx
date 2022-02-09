import { NavLink, useNavigate } from "react-router-dom";

const SiteNav = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-xlg">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#wht-nav"
          aria-controls="wht-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="bi bi-calendar4-event"></span>
        </button>
        <div className="collapse navbar-collapse" id="wht-nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link mx-2 link-button ps-2"
                data-bs-toggle="collapse"
                data-bs-target="#wht-nav"
                aria-current="page"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "black" : "grey",
                  };
                }}
                to={`/`}
                onClick={() => navigate("/")}
              >
                What happens today
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link mx-2 link-button ps-2"
                data-bs-toggle="collapse"
                data-bs-target="#wht-nav"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "black" : "grey",
                  };
                }}
                to={`/nothing`}
                onClick={() => navigate("/nothing")}
              >
                What if nothing happens today
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link mx-2 link-button ps-2"
                data-bs-toggle="collapse"
                data-bs-target="#wht-nav"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "black" : "grey",
                  };
                }}
                to={`/alreadyknow`}
                onClick={() => navigate("/alreadyknow")}
              >
                I already know what happens today
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link mx-2 link-button ps-2"
                data-bs-toggle="collapse"
                data-bs-target="#wht-nav"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "black" : "grey",
                  };
                }}
                to={`/secondopinion`}
                onClick={() => navigate("/secondopinion")}
              >
                A second opinion (i.e., what happens today)
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default SiteNav;
