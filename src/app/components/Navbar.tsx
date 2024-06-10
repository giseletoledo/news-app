
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand custom-navbar-brand">Site de Notícias</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/search" className="nav-link custom-nav-link">
              <i className="bi bi-search me-1"></i>
                Buscar Notícias</Link>
            </li>
            <li className="nav-item">
              <Link href="/top-headlines" className="nav-link custom-nav-link">
              <i className="bi bi-newspaper me-1"></i>
              Notícias Principais</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
