import './App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/Register">Registration</Link>
        </li>

        <li>
          <Link to="/ApiCalling">ProductList</Link>
        </li>

        <li>
          <a href="/model_1_StaticWeb/index.html">
            ShoesWeb
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;