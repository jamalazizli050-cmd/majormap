import { Compass } from "lucide-react";
import { NavLink } from "react-router-dom";

function Header() {
  const links = [
    ["Home", "/"],
    ["Start", "/quiz"],
    ["Results", "/results"],
    ["Compare", "/compare"],
    ["About", "/about"],
  ];

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="UniSearch home">
        <span className="brand-mark">
          <Compass size={20} />
        </span>
        <span>UniSearch</span>
      </NavLink>
      <nav className="nav-links" aria-label="Main navigation">
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : undefined)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
